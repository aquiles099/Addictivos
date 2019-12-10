#Api Routes
```
NOTA: Esta es la versión de las rutas finales, temporalmente obviar la parte de la ruta que dice , pero tener en consideracíon que en un futuro sera necesario agregar.

"...": significa que es la ruta base ya sea localhost o la direccion base del servidor

Composicion de la respuesta del servidor

{
    code: "",
    message: "",
    data: {
    }
}

Code: Representa el codigo http de la respuesta

Message: Representa un mensaje de error o de una operacion exitosa, por los momentos el mensaje es opcional

data: Objeto que contiene la respueta con la información que se busco o peticion que se realizo, Ejemplo: Al buscar los usuarios data contiene un arreglo llamado users que contiene los usarios. En este arreglo tambien se envian los errores de los formulario en un objeto llamado errors
```
#RUTAS

##Autenticación
```
.../auth/login

Metodo:Post 

Funcion: Realiza login de usuario en la 
aplicación

Parametros: { 
    user: string,
    password: string
} 

.../auth/register

Metodo:Post 

Funcion: Realiza registro usuario en la aplicación

Parametros: { 
    name: string,
    last_name: string,
    dni: string,
    email: string,
    password: string,
    phone: string,
    username: string,
    address: string,
    policy: string,
    avatar_file_name: string
} 

.../auth/logout

Metodo:Post 

Funcion: Realiza deslogeo de usuario en la aplicación
```
##Usuario
```
.../user/users

Metodo:get

Funcion: Busca todos todos usuarios relacionados a una compañia

.../user/create

Metodo:post

Funcion: Crea un usuario relacionado a una compañia

Parametros: {
    name: string,
    last_name: string,
    dni: string,
    email: string,
    password: string,
    phone: string,
    username: string,
    address: string,
    policy: string,
    avatar_file_name: image,
    role: integer
}

.../user/{id}

Metodo:get

Funcion: Busca un usuario relacionadoa una compañia por su id

.../user/{id}

Metodo:patch

Funcion: Actualiza un usuario de una compañia

Parametros: {
    name: string,
    last_name: string,
    dni: string,
    email: string,
    password: string,
    phone: string,
    username: string,
    address: string,
    policy: string,
    avatar_file_name: image,
    role: integer
}

.../user/{id}

Metodo:delete

Funcion: Borra un usuario de una compañia

```
##Ofertas
```
.../deal/deals

Metodo:get

Funcion: Busca todas las ofertas

.../deal/create

Metodo:post

Funcion: Crea una oferta en una compañia

Parametros: {
    'short_title',
    'long_title',
    'main_image': -> [
        id: integer //contiene el id de la imagen principal en caso que exista
        avatar: file
    ]
    'effective_date',
    'deal_total_limit',
    'user_purchase_limit',
    'short_description',
    'long_description',
    'restrictions',
    'commerce_id',
    'category_id',
    'slug',
    'closing_date'
    'is_public,
    'available_until',
    'gift_title'
    'user_gift_limit',
    'discount',
    'images_deal',
    'payment_type',
    'deal_type_id',
    'commission',
    'seller_id',
    'company_id',
    'images' //AQUI DEBE IR UN ARREGLO CON LAS IMAGENES DE LA GALERIA DE IMAGENES, ESTE ARREGLO TIENE LA MISMA ESTRUCTURA QUE "main_image"
}
```
##Opciones de Precio
```
.../optionprice/alloptionprices

Metodo:get

Funcion: Busca todas las opciones de precio

.../deal/{id}/optionprice/optionprices

Metodo:get

Funcion: Busca todas las opciones de precio de una oferta

.../deal/{id}/optionprice/create

Metodo:post

Funcion: Crea una opcion de precio en una oferta

Parametros: {
	"original":int,
	"discount":int,
	"limit":int,
	"description":string,
	"efective_date":date,
	"closing_date":date,
	"status":int,
	"deal_id":int,
	"user_purchase_limit":int,
	"user_purchase_gift_limit":int,
	"courtesy":int,
	"purchase_activation":int
}

.../deal/{id}/optionprice/{id}

Metodo:get

Funcion: Busca una opcion de precio relacionadoa una oferta por su id

.../deal/{id}/optionprice/{id}

Metodo:patch

Funcion: Actualiza una opcion de precio de una oferta

Parametros: {
	"original":int,
	"discount":int,
	"limit":int,
	"description":string,
	"efective_date":date,
	"closing_date":date,
	"status":int,
	"deal_id":int,
	"user_purchase_limit":int,
	"user_purchase_gift_limit":int,
	"courtesy":int,
	"purchase_activation":int
}

.../deal/{id}/optionprice/{id}

Metodo:delete

Funcion: Borra una opcion de precio de una oferta

```
##Plataforma de Pagos
```
.../paymentplatform/paymentplatforms

Metodo:get

Funcion: Busca todas las plataformas de pagos

.../paymentplatform/create

Metodo:post

Funcion: Crea una plataforma de pago

Parametros: {
    'name': string,
    'description': string,
    'avatar_file_name': image,
    'status':int,
}

.../paymentplatform/{id}

Metodo:get

Funcion: Busca una plataforma de pago por su id

.../paymentplatform/{id}

Metodo:patch

Funcion: Actualiza una plataforma de pago

Parametros: {
    'name': string,
    'description': string,
    'avatar_file_name': image,
    'status':int,
}

.../paymentplatform/{id}

Metodo:delete

Funcion: Borra una plataforma de pago
```
##Categorias
```
.../category/categories

Metodo:get

Funcion: Busca todas las categorias

.../category/create

Metodo:post

Funcion: Crea una Categoria

Parametros: {
    'title': string,
    'icon_class': string
}

.../category/{id}

Metodo:get

Funcion: Busca una categoria por su id

.../category/{id}

Metodo:patch

Funcion: Actualiza una categoria

Parametros: {
    'title': string,
    'icon_class': string
}

.../category/{id}

Metodo:delete

Funcion: Borra una categoria
```
##Tarjetas de usuarios
```
.../user/{user_id}/card/cards

Metodo:get

Funcion: Devuelve todas las tarjetas de un usuario

.../user/{user_id}/card/create

Metodo:post

Funcion: Crea una tarjeta de un usuario

Parametros: {
    'card_number': string
    'card_type': string
    'card_status': int
    'card_token': string
    'card_expiration_date': date
}

.../user/{user_id}/card/{id}

Metodo:get

Funcion: Busca una tarjeta de un usuario por su id

.../user/{user_id}/card/{id}

Metodo:patch

Funcion: Actualiza una tarjeta de un usuario

Parametros: {
    'card_number': string
    'card_type': string
    'card_status': int
    'card_token': string
    'card_expiration_date': date
}

.../user/{user_id}/card/{id}

Metodo:delete

Funcion: Borra una tarjeta de un usuario

```

##Compras
```
.../purchase/purchases

Metodo:get

Funcion: Devuelve todas las compras

.../purchase/create

Metodo:post

Funcion: Crea una compra

Parametros: {
}

.../purchase/{id}

Metodo:get

Funcion: Busca una compra

.../purchase/{id}

Metodo:patch

Funcion: Actualiza una compra

Parametros: {

}

```