<?php

namespace App\Models\GraphQLPassportSocialite;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Joselfonseca\LighthouseGraphQLPassport\Models\SocialProvider;
use Laravel\Socialite\Facades\Socialite;

/**
 * Trait HasSocialLogin.
 */
trait HasSocialLogin
{
    public function socialProviders()
    {
        return $this->hasMany(SocialProvider::class);
    }

    /**
     * @param  Request  $request
     * @return mixed
     */
    public static function byOAuthToken(Request $request)
    {
        $userData = Socialite::driver($request->get('provider'))->userFromToken($request->get('token'));

        try {
            $user = static::whereHas('socialProviders', function ($query) use ($request, $userData) {
                $query
                    ->where('provider', Str::lower($request->get('provider')))
                    ->where('provider_id', $userData->getId());
            })->firstOrFail();
        } catch (ModelNotFoundException $e) {
            $user = static::where('email', $userData->getEmail())->first();
            if (! $user) {
                $user = static::create([
                    'first_name' => $userData->offsetGet('given_name'),
                    'last_name' => $userData->offsetGet('family_name'),
                    'email' => $userData->getEmail(),
                    'avatar' => $userData->getAvatar(),
                    'google_id' => $userData->id,
                ]);
            }
            SocialProvider::create([
                'user_id' => $user->id,
                'provider' => $request->get('provider'),
                'provider_id' => $userData->getId(),
            ]);
        }
        Auth::setUser($user);

        return $user;
    }
}
