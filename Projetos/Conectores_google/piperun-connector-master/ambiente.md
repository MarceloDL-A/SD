Verifique se o node está instalado
````terminal
> node --version
v16.14.2
````
Caso não esteja [instale!](https://nodejs.org/en/download/)

Verifique se o npm está instalado
````terminal
> npm --version
8.7.0
````

Caso o npm não esteja execute o comando
````terminal
npm install -g npm@8.7.0
````

# Iniciando um novo conector
Abra uma pasta de trabalho (essa pasta pode estar vazia) e execute o comando:
````terminal
npx @google/dscc-gen connector
````
Caso falte algum pacote será solicitada uma confirmação para que seja instalado.
````terminal
Need to install the following packages:
  @google/dscc-gen
Ok to proceed? (y)
````
Digite a letra __y__ e tecle __Enter__

Pode aparecer a seguinte solicitação
````terminal
? May this tool anonymously report usage statistics to improve over time? What we collect (https://github.com/googledatastudio/dscc-gen#what-we-collect) (Y/n) 
````
Digite __n__ e depois __Enter__ para prosseguir.

Será solicitado um __Project name__. Digite um nome e depois __Enter__. Será criada uma pasta com o nome dado contendo as configurações básicas do conector.

````terminal
? Project name 
````
Então será solicitado o tipo de autenticação. Com as setas do teclado escolha "KEY" para o projeto em questão, __PipeRun_v0009__ e pressione __Enter__.
````terminal
? Project name PipeRun_v0009
? How will users authenticate to your service? 
  NONE           - No authentication required. 
  OAUTH2         - Standard OAUTH2 
> KEY            - Key or Token 
  USER_PASS      - Username & Password 
  USER_TOKEN     - Username & Token 
  PATH_USER_PASS - Path & Username & Password 
````
Uma pasta com o nome do projeto __PipeRun_v0009__  deve surgir na pasta do projeto. Essa pasta possui algumas configurações básicas do conetor. 

> Caso seja a primeira vez que exetute esses passos aparecerá no prompt o seguinte:

````terminal
Clasp must be globally authenticated for dscc-gen.
running npx @google/clasp login ...

Logging in globally...
🔑 Authorize clasp by visiting this url:
https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fscript.deployments%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fscript.projects%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fscript.webapp.deploy%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fdrive.metadata.readonly%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fdrive.file%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fservice.management%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Flogging.read%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcloud-platform&response_type=code&client_id=1072944905499-vm2v2i5dvn0a0d2o4ca36i1vge8cvbn0.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A53212
````
E pode ser que o navegador seja automaticamente aberto e abra uma página de autenticação do google. Caso não abra automaticamente segure __Ctrl__ e clique o link para ser direcinado a referiada página.

A autenticação é bem direta. Caso corra tudo bem o navegador apresentará uma tela em branco com a mensagem:
````
Logged in! You may close this page. 
````
Pode fechar essa aba do nagegador e voltar para o VScode.

Caso tenha corrido tudo bem com a autenticação e com o passo a passo até aqui devem aparecer as seguintes instruções no terminal:

````terminal
npm run open - open your project in Apps Script.
npm run push - push your local changes to Apps Script.
npm run watch - watches for local changes & pushes them to Apps Script.
npm run prettier - formats your code using community standards.
npm run try_latest - opens the deployment with your latest code.
npm run try_production - opens your production deployment.
npm run update_production - updates your production deployment to use the latest code.
````


Antes de prosseguir você pode deletar a pasta __src__ dentro da pasta criada __PipeRun_v0009__ e substituir pelo pasta do código fonte de algum projeto de interesse. No nosso caso vamos substituir pela para __src__ do projeto baixado __piperun-connector-master__.

Agora acesse a pasta do projeto __PipeRun_v0009__ com o comando:
````terminal
cd .\PipeRun_v0009\
````

O camando a seguir atualiza o repositório do seu perfil em [__script.google.com__](https://script.google.com/)
````terminal
> npm run push

> push
> dscc-scripts connector push_changes

? Manifest file has been updated. Do you want to push and overwrite? (y/N) 
````
Confirme teclando __y__ e __Enter__.

Para abrir o projeto execute o comando:
````terminal
npm run open
````
Assim o navegador abre e direciona você para a pasta do seu projeto no site [__script.google.com__](https://script.google.com/)

Na página que aparece clique em __Publicar__ > __Implantar pelo manifsto ...__

Abre uma nova tela. Clique em __Latest Version (Head)__

Será mostrado um link. Clique nesse link e prossiga com as instruções que aparecem na tela.

Será requerido um token de autenticação. O token é:
````terminal
a238acfdfedb6842954b40d3f9e72374
````
# Modificações do script

Caso queira modificar o script. Modifique-o depois execute o camando:
````terminal
npm run push
````
Com isso a branch de desenvolvimento é atualizada.

## __Template para teste__
Para testes de carregamento foi fornecido o seguinte link com um template que utiliza o conector.
````terminal
https://datastudio.google.com/reporting/a5727299-d156-4711-a607-4ea5f6e4bb6d/page/p_kler3bz4rc
````
````terminal
````





````terminal
````













