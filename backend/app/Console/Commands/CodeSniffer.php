<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Symfony\Component\Process\Process;

class CodeSniffer extends Command
{
    protected $signature = 'code:sniffer';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'This command will run PHP Code Sniffer to check laravel codes';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $process = new Process([
            './vendor/bin/phpcs',
            '--colors',
            '--report=full',
            '--exclude=PSR1.Methods.CamelCapsMethodName',
            '--standard=PSR2',
            './app',
            './config',
            './database',
            './routes',
            './tests',
        ]);

        $process->run();

        echo $process->getOutput();
    }
}
