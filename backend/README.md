## Firing up the backend
- npm install 
- node server.js

## sample user credential to inserted in mongodb
email: test@test.com
pass: adminadmin

# api list
/login (post)
/api/expenses (POST, GET)
/api/expenses/:_id (POST, GET)
/api/categories (POST, GET)
/api/categories/:_id (POST, GET)

# data schema used in mongodb
## users
name: String,
email: String,
password: String

## expenses
title: String,
category: String,
date: Date,
value: Number

## categories
title: String,
description: String
