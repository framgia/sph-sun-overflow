<?php

namespace App\GraphQL\Mutations;

use Illuminate\Support\Facades\Auth;
use Joselfonseca\LighthouseGraphQLPassport\Exceptions\AuthenticationException;
use Joselfonseca\LighthouseGraphQLPassport\GraphQL\Mutations\BaseAuthResolver;

final class SocialLogin extends BaseAuthResolver
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        $emailProvider = substr($args['email'], strpos($args['email'], '@') + 1);

        if ($emailProvider !== 'sun-asterisk.com') {
            throw new AuthenticationException(__('Authentication exception'), __('Email does not belong to Sun*'));
        }

        $credentials = $this->buildCredentials($args, 'social_grant');
        $response = $this->makeRequest($credentials);
        $model = $this->makeAuthModelInstance();
        $user = $model->where('id', Auth::user()->id)->firstOrFail();
        $response['user'] = $user;

        return $response;
    }
}
