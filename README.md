## Initialize Node.js project

npm init -y

## Install dependencies

npm install

## Install Express

npm install express

## Create index.js

This is the main application file where we will set up the server and define our API routes.

## Create Dockerfile

Define the container setup for the app.

## Set up .env file

Include database connection details and other environment-specific configurations.

## Implement CRUD APIs in index.js

GET – Fetch resources

POST – Create new resources

PUT – Update existing resources

DELETE – Remove resources

##  Docker Commands
--Build Docker Image--
docker build -t node-app .

--Run Docker Container--
docker run -p 5000:5000 --env-file .env node-app

## REST Api
--GET
http://localhost:5000/employee

--POST
http://localhost:5000/employee

--GET (one employee)
http://localhost:5000/employee/69a81d34e16bffb9257e4348

--PUT
http://localhost:5000/employee/69a81d34e16bffb9257e4348 

--DELETE
http://localhost:5000/employee/69a81d08e16bffb9257e4346

 


