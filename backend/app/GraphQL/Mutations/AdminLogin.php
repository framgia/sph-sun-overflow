<?php

namespace App\GraphQL\Mutations;

use App\Exceptions\CustomException;
use Illuminate\Support\Facades\Auth;

final class AdminLogin
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        if (Auth::attempt(['email' => $args['email'], 'password' => $args['password']])) {
            $user = Auth::user();

            if ($user->role_id !== 1) {
                throw new CustomException('Your account is not of admin role.Please login with an admin role account.');
            }

            return $user->createToken('SunOverflowAdmin')->accessToken;
        } else {
            throw new CustomException('Email and Password are not valid. Please try again.');
        }
    }
}
