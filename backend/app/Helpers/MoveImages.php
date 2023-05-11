<?php

namespace App\Helpers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Str;

final class MoveImages
{
    static $temp_str = 'temp';
    static $desc_str = 'description';
    static $src_regex = '/src="([^"]*)"/i';
    public static function move($string){
        if( !Str::contains($string, '<img')){
            return $string;
        }
        $newString = preg_replace_callback('/<img([^>]*)>/i', function($match) {
            $src = self::extractImgUrl($match);
            $new_src = self::moveFileIfTemp($src);
            return '<img src="' . $new_src . '" alt="' . $new_src . '">';
        }, $string);
        return $newString;
    }

    private static function extractImgUrl($match){
        preg_match(self::$src_regex, $match[1], $srcMatch);
        return $srcMatch[1];
    }


    private static function generateIfMissingPath($path){
        if(!file_exists($path)){
            mkdir($path,0777, true);
        }
    }

    private static function moveFileIfTemp($string){
        $temp_path = storage_path('app/public/'.self::$temp_str.'/');
        $desc_path = storage_path('app/public/'.self::$desc_str.'/');
        self::generateIfMissingPath($temp_path);
        self::generateIfMissingPath($desc_path);

        if(preg_match('/\/temp\//',$string)){
            $file_str = explode(URL::to('/').'/storage/temp/',$string)[1];
            Storage::move('/public/'.self::$temp_str.'/'.$file_str, '/public/'.self::$desc_str.'/'.$file_str);
            return URL::to('/').'/storage/'.self::$desc_str.'/'.$file_str;
        }
        return $string;

    }
}
