# backend-test
Esta é uma API desenvolvida em NodeJS que retorna listas de musicas baseadas na temperatura da cidade informada na consulta.<br>
- Para temperaturas iguais ou inferiores a 10ºC sugere Musicas Classicas<br>
- Para temperaturas entre 10ºC e 25ºC sugere Rock<br>
- Para temperaturas acima dos 25ºC sugere Pop<br>
  
A API tambem possui um historico de todas as consultas realizadas com sucesso não importando a forma como foi digitado o nome da cidade e retorna o numero total de consultas realizadas e o numero de consultas para cada cidade baseado na forma como foi digitado o nome da mesma.

 #### Para testar a API na WEB
Substitua `<cidade>` pelo nome da cidade que deseja consultar.

`GET https://ingaia-backend-teste.herokuapp.com/<cidade>`

Para visualizar o historico de chamadas utilize a chamada abaixo.

`GET https://ingaia-backend-teste.herokuapp.com/history` 

## Tecnologias Utilizadas
- **NodeJS**
- **MongoDB**
- **Heroku**
#### Denpendencias
- **axios**
- **cors**
- **dotenv**
- **express**
- **mongoose**
- **nodemon**

## Instalando projeto em sua maquina
Faça o [Download ](https://github.com/Jere201086/backend-test/archive/master.zip "Download ") ou clone o repositorio em uma pasta de sua maquina.
```bash
$ git clone https://github.com/Jere201086/backend-test.git
```

Pelo terminal dentro da pasta do projeto execute o comando abaixo para instalar
as dependencias.
```bash
$ npm install
```

## Executando projeto com Docker
Antes de iniciar a execução com o Docker certifique-se de ter criado epreenchido o arquivo *.env*
na pasta raiz do projeto com os dados necessarios para garantir o acesso da aplicação ao MongoDB , API do Spotify e a API Weather os modelos de como criar e setar essas variaveis estão no arquivo *.env-sample*. Essa configuração é necessaria para garantir a segurança de seus dados de acesso.

![.env file](https://github.com/Jere201086/Images-For-Readmes/blob/master/img-backend-test-readme/envIMG.png ".env file")

Dentro da pasta raiz do projeto execute os comando abaixo.

Construindo a imagem para executar o projeto:

`$ docker build -t jmmo/dockernodejs .`

Para executar o projeto execute o comando abaixo no terminal:

`$ docker run -p 3000:3000 -d jmmo/dockernodejs`

Para parar a execução do container digite o seguinte comando no terminal `<ID>` deve ser o ID do seu container em execução:

`$ docker stop <ID>`

Para obter o ID de seu container execute

`$ docker container ls`

## Testando a API

Você pode testar as chamadas para a API diretamente pelo browser ou usando Postman, Imsomnia etc...<br>
#### Neste exemplo estou usando o Postman
Para testar localmente crie duas novas requests do tipo **GET**<br>
1. Request para consultar a cidade:

`GET http://localhost:3000/<cidade>`

![consulta](https://github.com/Jere201086/Images-For-Readmes/blob/master/img-backend-test-readme/query.png "consulta")

2. Request para obter o hitorico de consultas

`GET http://localhost:3000/history`

![history](https://github.com/Jere201086/Images-For-Readmes/blob/master/img-backend-test-readme/history.png "history")

