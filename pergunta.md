professor voce poderia me ajudar nesta tarefa o meu server não esta conectando fica dando um erro no mongoose aqui esta o link https://github.com/samuel-lino/cadastro_de_pacientes, eu fiz a pergunta por aqui pois não estava conseguindo digitar no site da ebac ficava deletando automaticamente o que digitava.

o erro é esse 

MongoParseError: Password contains unescaped characters
    at new ConnectionString (C:\Users\samue\OneDrive\Área de Trabalho\aula_javascript\cadastro_de_pacientes\server\node_modules\mongoose\node_modules\mongodb-connection-string-url\lib\index.js:115:23)
    at parseOptions (C:\Users\samue\OneDrive\Área de Trabalho\aula_javascript\cadastro_de_pacientes\server\node_modules\mongoose\node_modules\mongodb\lib\connection_string.js:185:17)
    at new MongoClient (C:\Users\samue\OneDrive\Área de Trabalho\aula_javascript\cadastro_de_pacientes\server\node_modules\mongoose\node_modules\mongodb\lib\mongo_client.js:51:63)
    at NativeConnection.createClient (C:\Users\samue\OneDrive\Área de Trabalho\aula_javascript\cadastro_de_pacientes\server\node_modules\mongoose\lib\drivers\node-mongodb-native\connection.js:288:14)
    at NativeConnection.openUri (C:\Users\samue\OneDrive\Área de Trabalho\aula_javascript\cadastro_de_pacientes\server\node_modules\mongoose\lib\connection.js:759:34)
    at Mongoose.connect (C:\Users\samue\OneDrive\Área de Trabalho\aula_javascript\cadastro_de_pacientes\server\node_modules\mongoose\lib\mongoose.js:403:15)
    at Object.<anonymous> (C:\Users\samue\OneDrive\Área de Trabalho\aula_javascript\cadastro_de_pacientes\server\config\db.js:6:26)
    at Module._compile (node:internal/modules/cjs/loader:1376:14)      
    at Module._extensions..js (node:internal/modules/cjs/loader:1435:10)
    at Module.load (node:internal/modules/cjs/loader:1207:32)

Node.js v20.10.0
[nodemon] app crashed - waiting for file changes before starting...  