<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Str;
use Illuminate\Support\Facades\Log;

class SaveImage implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, SerializesModels;

    protected $image;
    protected $path;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($image, $path = 'public')
    {
        $this->image = $image;
        $this->path = $path;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $file_extension = $this->image->getClientOriginalExtension();
        
        $image_path = $this->image->storeAs($this->path, Str::uuid() . '.' . $file_extension);
        return $image_path;
      
    }
}
