<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Symfony\Component\Process\Process;

class PintFormatting extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'code:pint {directory?}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'This command will run laravel PINT';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $process = new Process(['./vendor/bin/pint', $this->argument('directory')]);

        $process->run();

        echo $process->getOutput();
    }
}
