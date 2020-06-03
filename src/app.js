const fs = require("fs");
const path = require("path");
const { resolve } = require("path");
const express = require("express");

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

const accountData = fs.readFileSync(resolve(__dirname, './json/accounts.json'), { encoding: "UTF8" });
const accounts = JSON.parse(accountData);

const userData = fs.readFileSync(resolve(__dirname, './json/users.json'), { encoding: "UTF8" });
const users = JSON.parse(userData);

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Account Summary',
        accounts: accounts
    })
})
app.get('/savings', (req, res) => {
    res.render('account', {
        account: accounts.savings
    })
})
app.get('/checking', (req, res) => {
    res.render('account', {
        account: accounts.checking
    })
})
app.get('/credit', (req, res) => {
    res.render('account', {
        account: accounts.credit
    })
})

app.listen(3000, () => {
    console.log("server is listening on port 3000.")
})