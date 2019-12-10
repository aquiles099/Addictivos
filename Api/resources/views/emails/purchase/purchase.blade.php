<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
</head>
<body>
    <style>
        @media only screen and (max-width: 600px) {
            .inner-body {
                width: 100% !important;
            }

            .footer {
                width: 100% !important;
            }
        }

        @media only screen and (max-width: 500px) {
            .button {
                width: 100% !important;
            }
        }

        body{

        }

        .text-center{
            text-align: center;
        }

        .bordered-button{
            border-radius: 16px;
            padding: 10px 20px;
            margin: 4px 2px;
            display: center;
        }

        .email{
            font-size: 1rem;
            padding: 4rem;
            align-items: center;
            flex-direction: column;
        }

        .head{
            background-color: #10164a;
            border-bottom-left-radius: 100%;
            border-bottom-right-radius: 100%;
            color: #fff;
            margin-bottom: 0.5rem;
            font-size: 2rem;
            width: -webkit-fill-available;
        }

        .button{
            background-color: #10164a;
            background-color: #10164a;
            color: #fff;
            border-color: #10164a;
            font-size: 1,5rem;
            text-transform: uppercase;
        }

        .basic-text{
            margin-top: 1rem;
            font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
        }

        .footer{
            background-color: #10164a;
            color: #fff;
            border-top-left-radius: 100%;
            border-top-right-radius: 50%;
            width: -webkit-fill-available;
            padding-top: 1rem;
            padding-bottom: 1rem;
        }

        th{
            text-align: inherit;
            padding-right: 1rem;
        }

        .payment-detail{
            display: flex;
            flex-direction: column;
        }
    </style>

    <table class="wrapper" width="100%" cellpadding="0" cellspacing="0" role="presentation">
        <tr>
            <td >
                <table class="content email"  border=1 frame=void rules=rows width="100%" cellpadding="0" cellspacing="0" role="presentation">
                    {{ $header ?? '' }}

                    <!-- Email Body -->
                    <tr>
                        <td colspan='2' class="body" width="100%" cellpadding="0" cellspacing="0">
                            <div class='head text-center'>
                                <h1 class='text-center basic-text'>Adictivos.com</h1>
                                <span class="basic-text">¡Compra Exitosa!</span><br>
                                <span class="basic-text">Colaborador de: ALORICA</span><br>
                                <span class="basic-text">Hola {{$user->name}}</span><br>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th rowspan="4" class="flex">
                            <img src="{{ $image_deal->avatar_file_name }}" alt="Image">                          
                        </th>
                        <td>Has adquirido la compra de: {{ $deal->short_title }}</td>
                    </tr>
                    <tr>
                        <td class='payment-detail'>
                            <div class='text-center'>
                                Detalles del pago
                            </div>
                            <table class='text-center'>
                                <tbody>
                                    <tr>
                                        <th>Tipo de Pago</th>
                                        <th>Monto Pagado</th>
                                        <th>Cant. de Cupones</th>
                                        <th>Transacción</th>
                                    </tr>
                                    <tr class='text-center'>
                                        <td>TDC</td>
                                        <td>{{ $purchase->total }}</td>
                                        <td>{{ $purchase->quantity }}</td>
                                        <td>{{ $purchase->order_key }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class='text-center'>
                                Contacte con {{ $deal->commerce->name }}
                            </div>
                            <div>
                                <div>
                                    + {{ $deal->commerce->cellphone }} <br>
                                    + {{ $deal->commerce->phone }}
                                </div>
                                <div>
                                    {{ $deal->commerce->email }}
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class='text-center basic-text'>
                                Ver detalles e información de tu compra haciendo click 
                                <a href="{{ env('APP_URL')}}" >Aqui</a>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colspan='2'>
                            <div class='footer text-center basic-text'>
                                @adictivosPanama
                            </div>
                        </td>
                    </tr>

                    {{ $footer ?? '' }}
                </table>
            </td>
        </tr>
    </table>
</body>
</html>