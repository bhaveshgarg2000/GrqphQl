require('dotenv').config();
const express = require('express');
const { createHandler } = require("graphql-http/lib/use/express");
const { buildSchema } = require('graphql');
const app = express()
const PORT = process.env.PORT;
app.use(express.json());
const UserModel = require('./Models/UserModel')
require('./DB/db')
const {schema, root} = require('./Schema/UserSchema');
app.all("/graphql", createHandler({ schema, rootValue: root }));


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})