<?php

namespace App\GraphQL\Queries;

use App\Models\Question;
use Exception;

final class Questions
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        $query = Question::query();

        try {
            if($args['filter'] == 'answered'){
                $query->has('answers');
            }
    
            if($args['filter'] == 'unanswered'){
                $query->doesntHave('answers');
            }

            return $query;

        } catch(Exception $e) {
            return $e->getMessage();
        }
    }
}
