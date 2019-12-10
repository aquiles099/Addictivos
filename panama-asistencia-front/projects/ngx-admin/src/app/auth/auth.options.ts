import { NbPasswordAuthStrategy, NbAuthJWTToken } from '@nebular/auth';
import { environment } from '../../environments/environment';

export const AuthOptions: any = {
  strategies: [
    NbPasswordAuthStrategy.setup({
      name: 'email',
      token: {
        class: NbAuthJWTToken,
        key: 'token.access_token'
      },
      baseEndpoint: environment.url,
      login: {
        redirect: {
          success: 'emporium',
          failure: null, // stay on the same page
        },
        endpoint: 'auth/login',
        method: 'post',
        defaultErrors:['Combinación Correo/Contraseña no es correcta. Por favor intente de nuevo.'],
        defaultMessages:['Inicio de sesión correcto.']
      },
      register: {
        redirect: {
          success: '/',
          failure: null, // stay on the same page
        },
        endpoint: 'auth/register',
        defaultErrors:['Algo salió mal, por favor intente de nuevo'],
        defaultMessages:['Se ha registrado satisfactoriamente.']
      },
      logout: {
        redirect:{
          success: 'pages/dashboard',
          failure: null,
        },
        //endpoint: 'auth/logout',
        defaultErrors:['Algo salió mal.. Intente de nuevo'],
        defaultMessages:['Se ha cerrado la sesión'],
      }
      
    }),
  ],
  forms: {
    login: {
      redirectDelay: 500, // delay before redirect after a successful login, while success message is shown to the user
      strategy: 'email',  // provider id key. If you have multiple strategies, or what to use your own
      rememberMe: true,   // whether to show or not the `rememberMe` checkbox
      showMessages: {     // show/not show success/error messages
        success: true,
        error: true,
      },
      //    socialLinks: socialLinks, // social links at the bottom of a page
    },
    register: {
      redirectDelay: 500,
      strategy: 'email',
      showMessages: {
        success: true,
        error: true,
      },
      terms: true,
      //  socialLinks: socialLinks,
    },
    requestPassword: {
      redirectDelay: 500,
      strategy: 'email',
      showMessages: {
        success: true,
        error: true,
      },
      //socialLinks: socialLinks,
    },
    resetPassword: {
      redirectDelay: 500,
      strategy: 'email',
      showMessages: {
        success: true,
        error: true,
      },
      //socialLinks: socialLinks,
    },
    logout: {
      redirectDelay: 300,
      strategy: 'email',
    },
    validation: {
      name: {
        required: true,
        minLength: 3,
        maxLength: 50,
      },
      lastName: {
        required: true,
        minLength: 3,
        maxLength: 50,
      },
      dni: {
        required: true,
      },
      policy: {
        required: true,
      },
      username: {
        required: true,
        minLength: 8,
      },
      email: {
        required: true,
      },
      phone: {
        required: true,
      },
      address: {
        required: true,
        minLength: 25,
      },
      password: {
        required: true,
        minLength: 6,
        maxLength: 16,
      },
      avatarFileName: {
        required: true,
        
      }

    },
  },
};
