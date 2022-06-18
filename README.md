## About Estoque - FRONT-END

Estoque - É um software que projeta todo o fluxo de estoque de uma loja de roupas, 
desde a sua entrada e saída de estoque até o ínicio e final de uma venda.

Com o projeto Estoque, você terá um sistema completo que irá suprir a necessidade
de uma loja pequena.

## Tecnologias 

React Js / Next Js / Sass / TypeScript / JavaScript / TypeOrm / PostgreSQL

## Instalação

1° Clonar o projeto
2° cd Front-Estoque
3° npm install 
4° npm run dev ou yarn dev 
5° OBS: Esse projeto contém apenas o Front-End do sistema
   o Back-end se encontra em outro repositório. 

## Bibliotecas

### Criar um projeto NextJs
npx create-next-app <nome projeto>

### Adicionar o Typescript e seus types
npm add typescript @types/react @types/node -D

### Instalar um sidebar - Menu ao lado
npm i react-pro-sidebar

### Adicionar React Icons
npm add react-icons

### Instala o Frameword Sass - Css
npm add sass

### Instalar o Axios a para api
npm add axios

### Referente ao entendimento de variaveis ambientes
npm install dotenv

### Instalação o Next Auth - OBS não está sendo usado nesse projeto
npm add next-auth
npm add @types/next-auth -D

### Instalação do React Paginate
npm install react-paginate

### Instalação da biblioteca de Material Ui - componentes prontos para estilização
npm install @mui/material @emotion/react @emotion/styled
npm i @material-ui/lab
npm i @material-ui/core

### Instalação do Moment para manipular data's
npm install moment --save

### Instalação do Nookies e seus Types para utilizar os kookies - Realizar o login
npm add nookies
npm add @types/cookie -D


## BACK-END

npm install typeorm

npm add express
npm add @types/express

npm add ts-node-dev -D

npm install bcryptjs
npm add @types/bcryptjs -D

npm install mysql --save

npm install pg

npm install reflect-metadata

npm add cors
npm add @types/cors -D

### BACK-END COMANDOS

//Comando para criar uma migration
npx typeorm migration:create -n Create<nome da migration>

//Comando para rodar as migrations
npm run typeorm migration:run

### VARIAVEIS DE AMBIENTE - FRONT-END

NEXT_PUBLIC_CHAVE_API_OpenWeatherMap=<Sua chave>

NEXT_PUBLIC_CHAVE_SENHA_ADM=<Sua chave>
