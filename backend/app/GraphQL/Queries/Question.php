<?php

namespace App\GraphQL\Queries;

use App\Exceptions\CustomException;
use App\Models\Question as ModelsQuestion;
use App\Models\Team;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

final class Question
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        $questionQuery = ModelsQuestion::query();
        $question = $questionQuery->where('slug', $args['slug'])->first();

        try {
            if (! $question->is_public) {
                $team = Team::findOrFail($question->team_id);
                if ($team->members->where('user_id', Auth::id())->isEmpty()) {
                    return new CustomException('Unauthorized', 'You are not allowed to view this question.');
                }
            }

            if ($args['shouldAddViewCount']) {
                $question->update(['views_count' => $question->views_count + 1]);
            }

            return $question;
        } catch (Exception $e) {
            $message = $e->getMessage();
            if (Str::contains($message, 'No query results for model')) {
                return new CustomException('Invalid team_id', 'Team does not exist.');
            } else {
                return new CustomException('Error', 'An error has occured.');
            }
        }
    }
}
