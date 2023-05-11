<?php

namespace App\GraphQL\Mutations;

use App\Exceptions\CustomException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\URL;

final class UploadImage
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function uploadImage($img, $name, $path)
    {
        if (! $img) {
            return null;
        }
        [, $img] = explode(',', $img);
        $data = base64_decode($img);
        $fileName = $name.'_'.time().'.png';
        $storagePath = storage_path("app/public/$path/");

        if (! file_exists($storagePath)) {
            mkdir($storagePath, 0777, true);
        }

        file_put_contents($storagePath.$fileName, $data);

        return URL::to('/').'/storage/'.$path.'/'.$fileName;
    }

    public function __invoke($_, array $args)
    {
        $user = Auth::user();
        return $this->uploadImage($args['img'], $user->slug, 'temp');
    }
}
