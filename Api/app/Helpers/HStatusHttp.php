<?php
  namespace App\Helpers;

  class HStatusHttp {
    /**
    * [code: 200]
    * La peticion Ha sido procesada de manera correcta.
    */
    const OK = 200;
    /**
    * [code: 400]
    * La solicitud contiene sintaxis errónea y no debería repetirse.
    */
    const BAD_REQUEST = 400;
    /**
    * [code: 401]
    * La autentificación es posible pero ha fallado o aún no ha sido provista.
    */
    const UNAUTHORIZED = 401;
    /**
    * [code: 403]
    * La solicitud fue legal, pero el servidor rehúsa responderla dado que el cliente no tiene los privilegios para hacerla.
    */
    const FORBIDDEN = 403;
    /**
    * [code: 409]
    * Indica que la solicitud no pudo ser procesada debido a un conflicto con el estado actual del recurso que esta identifica.
    */
    const CONFLICT = 409;
    /**
    * [code: 404]
    * Recurso no encontrado.
    */
    const NOT_FOUND = 404;
    /**
    * [code: 500]
    * Error interno.
    */
    const INTERNAL_SERVER_ERROR = 500;
  }
