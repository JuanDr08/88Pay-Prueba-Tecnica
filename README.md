# IMPORTANTE

# Hola equipo de 88pay

En la revision con brayan durante la ejecucion de la prueba tecnica con serverless offline la respuesta de la API daba error, aqui quiero darles la solucion ya que me di cuenta de cual fue realemente el problema

como bien sabran, al hacer solicitudes get, no se deberia mandar ningun cuerpo de datos, por lo que cuando esten probando la api, en los endpoints GET porfavor eliminen el json que tengan en el body ya sea en insomnia, postman o thunder client, ya que durante la demostracion a brayan del resultado yo deje datos en el body durante la solicitud y por esto daba error

Espero puedan entenderme y perdonarme hacer este commit despues de la prueba, no subi ningun poco de codigo despues de que termino el plazo