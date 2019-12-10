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
            display: flex;
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
    </style>

    <table class="wrapper" width="100%" cellpadding="0" cellspacing="0" role="presentation">
        <tr>
            <td >
                <table class="content" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                    {{ $header ?? '' }}

                    <!-- Email Body -->
                    <tr>
                        <td class="body" width="100%" cellpadding="0" cellspacing="0">
                            <div class='email'>
                                <div class='head text-center'>
                                    <h1 class='text-center basic-text'>Adictivos.com</h1>
                                    <span class="basic-text">¡Promociones y beneficios <br> solo para ti!</span>
                                </div>
                                <div class='text-center'>
                                    <div class="basic-text">
                                        Te damos la bienvenida 
                                    </div>
                                    <div class="basic-text">
                                        {{ $user_full_name }}
                                    </div>
                                    <div class="basic-text">
                                        Para acceder a tu cuenta y disfrutar de nuestras ofertas, <br> necesitamos validar tu usuario
                                    </div>
                                </div>
                                <button class='button button-primary bordered-button' href="{{env('APP_URL')}}">Validar Usuario</button>
                                <div class='footer text-center basic-text'>
                                    @adictivosPanama
                                </div>
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