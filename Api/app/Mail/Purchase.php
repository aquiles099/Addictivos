<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\Models\Deal;
use App\Models\ImagesDeal;

class Purchase extends Mailable
{
    use Queueable, SerializesModels;

    public $purchase;
    public $option_pricing;
    public $user;
    public $deal;
    public $image_deal;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($purchase)
    {
        $this->purchase = $purchase;
        $this->option_pricing = $purchase->option_pricing;
        $this->deal = $purchase->deal;
        $this->user = $purchase->user;
        $this->image_deal = ImagesDeal::getSingleImageDeals($this->deal)->images[0];
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.purchase.purchase');
    }
}
