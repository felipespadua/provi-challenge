# Provi Challenge

Technical challenge for Provi selective process

## Requirements

For building and running the application you need:

- [Node](https://nodejs.org/en/)
- [Npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/)

## Documentation
[Postman](https://documenter.getpostman.com/view/9680019/SWE83cHA)


## Running

First, clone the project:

```shell
git clone https://github.com/felipespadua/provi-challenge.git
cd provi-challenge

```

#### Create .env in root folder

  It must have the variables
```
PORT=3000 
ENV=development
MONGODB_URI=mongodb://localhost/provi
SECRET=mysecret
```

#### Running locally 

To get the Node server running locally:

- `npm install` to install all required dependencies
- Install MongoDB Community Edition ([instructions](https://docs.mongodb.com/manual/installation/#tutorials)) and run it by executing `mongod`
- `npm run dev` to start the local server

##  Testing

```shell
./provi-challenge npm test
```

## Built With

- [JavaScript](https://www.javascript.com/) - Programming language
- [Visual Studio Code](https://code.visualstudio.com/) - IDE
- [Express](https://expressjs.com/pt-br/) - JavaScript Framework
- [Npm](https://www.npmjs.com/) - Dependency Management