<?php

namespace App\GraphQL\Queries;

use App\Models\Question as ModelsQuestion;
use App\Models\Team;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

final class Question
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        $questionQuery = ModelsQuestion::query();

        if (isset($args['answerSort'])) {
            $questionQuery->with(['answers' => function ($query) use ($args) {
                foreach ($args['answerSort'] as $sort) {
                    if ($sort['column'] == 'votes_sum_value') {
                        $query->withSum(['votes' => function ($query) {
                            $query->select(DB::raw('COALESCE(SUM(value), 0)'));
                        }], 'value');
                    }

                    $query->orderBy($sort['column'], $sort['order']);
                }
            }]);
        }

        $question = $questionQuery->where('slug', $args['slug'])->first();

        $checker = true;

        if (! $question->is_public) {
            $team = Team::findOrFail($question->team_id);
            if ($team->members->where('user_id', Auth::id())->isEmpty()) {
                $checker = false;
            }
        }

        if ($checker) {
            if ($args['shouldAddViewCount']) {
                $question->update(['views_count' => $question->views_count + 1]);
            }

            return $question;
        }
    }
}
