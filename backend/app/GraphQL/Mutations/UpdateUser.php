<?php

namespace App\GraphQL\Mutations;

use App\Exceptions\CustomException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\URL;

final class UpdateUser
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function uploadAvatar($avatar, $email, $path = 'avatar')
    {
        if (! $avatar) {
            return null;
        }
        [, $avatar] = explode(',', $avatar);
        $data = base64_decode($avatar);
        $fileName = $email.'_'.time().'.png';
        $storagePath = storage_path("app/public/$path/");

        if (! file_exists($storagePath)) {
            mkdir($storagePath, 0777, true);
        }

        file_put_contents($storagePath.$fileName, $data);

        return URL::to('/').'/storage/avatar/'.$fileName;
    }

    public function __invoke($_, array $args)
    {
        $user = Auth::user();

        if (strlen($args['first_name']) > 30) {
            throw new CustomException('Please limit the first name to less than 30 characters');
        }

        if (strlen($args['last_name']) > 30) {
            throw new CustomException('Please limit the last name to less than 30 characters');
        }

        if (strlen($args['about_me']) > 250) {
            throw new CustomException('Please limit the about me to less than 250 characters');
        }

        $user->update([
            'first_name' => $args['first_name'],
            'last_name' => $args['last_name'],
            'about_me' => $args['about_me'],
            'avatar' => str_contains($args['avatar'], 'base64') ?
                $this->uploadAvatar($args['avatar'], $user->email) : $user->avatar,
        ]);

        return $user;
    }
}
