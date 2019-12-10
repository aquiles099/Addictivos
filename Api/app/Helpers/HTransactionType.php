<?php

namespace app\Helpers;

class HTransactionType {
    const CREDIT_CARD = 1;
    const TRANSFER = 2;  
    const DEPOSIT = 3;
    const CHARGEBACK = 4;
    const RETURN = 5;
}