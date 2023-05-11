<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Symfony\Component\Console\Output\OutputInterface;

class DeleteTempImages extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'delete:temp-images';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $temp_folder = storage_path('app/public/temp');
        $this->line($temp_folder, null, OutputInterface::OUTPUT_NORMAL);
        File::deleteDirectory($temp_folder);
        mkdir($temp_folder,0777, true);

        return Command::SUCCESS;
    }
}
