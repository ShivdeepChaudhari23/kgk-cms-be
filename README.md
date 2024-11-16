# kgk-cms-be
Backend for Content Management System

## Instructions

1. Clone the repository
2. run `npm install`
3. Setup the environment variables in .env file at root directory as
```
DATABASE_URL="{your-database-type}://{user}:{password}@localhost:{port}/kgk_cms"
PORT={PORT_NO}
```
4. Setup mysql and create database (kgk_cms) in mysql.

5. Run following command in database
```
npx prisma migrate dev --name init
```
6. Run command
```npm run start```
