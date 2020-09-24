# backend-test
Esta é uma API desenvolvida em NodeJS que retorna listas de musicas baseadas na temperatura da cidade informada na consulta.
- Para temperaturas iguais ou inferiores a 10ºC sugere Musicas Classicas
- Para temperaturas entre 10ºC e 25ºC sugere Rock
- Para temperaturas acima dos 25ºC sugere Pop
 A API tambem possui um historico de todas as consultas realizadas com sucesso não importando a forma como foi digitado o nome da cidade e retorna o numero total de consultas realizadas e o numero de consultas para cada cidade baseado na forma como foi digitado o nome da mesma.
## Tecnologias Utilizadas
- **NodeJS**
- **MongoDB**
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

Pelo terminal dentro da pasta da projeto instale o projeto e as dependencias com o comando.
```bash
$ npm install
```

## Executando projeto com Docker
Antes de iniciar a execução com o Docker certifique-se de ter preencido o arquivo *.env *
na pasta raiz do projeto com os dados necessarios para garantir o acesso da aplicação ao MongoDB , API do Spotify e a API Weather. Essa configuração é necessaria para garantir a segurança de seus dados de acesso.
![.env file](https://github.com/Jere201086/Images-For-Readmes/blob/master/img-backend-test-readme/envIMG.png ".env file")

Construindo a imagem para executar o projeto:

`docker build -t jmmo/dockernodejs .`

Para executar o projeto execute o comando abaixo no terminal:

`docker run -p 3000:3000 -d jmmo/dockernodejs`

Para para a execução do container digite o seguinte comando no terminal <ID> deve ser o ID do seu container em execução:

`docker stop <ID>`