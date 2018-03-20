# Learning GraphQL

This application shows how to implement a GraphQL using Node + Express.

The database used here is [json-server](https://github.com/typicode/json-server).

This was developed following [this course](https://www.udemy.com/graphql-with-react-course/)

## json:server

To start the json server, it is necessary to add a `db.json` file in repository folder and then start it with the command:

```bash
yarn json:server
```

## environment variables

The following environment variables are necessary:

```txt
JSON_SERVER=<The URL of json-server. Use http://localhost:3000 if starting the server using yarn json:server>
```
