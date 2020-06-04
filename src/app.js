const fs = require("fs");
const path = require("path");
const { resolve } = require("path");
const express = require("express");

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

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
app.get('/profile', (req, res) => {
    res.render('profile', {
        user: users[0]
    })
})
app.get('/transfer', (req, res) => {
    res.render('transfer')
})
app.post('/transfer', (req, res) => {
    console.log(req.body)
    const from = req.body.from;
    const to = req.body.to;
    const amount = req.body.amount;
    accounts[from].balance -= parseInt(amount);
    accounts[to].balance += parseInt(amount);
    const accountsJSON = JSON.stringify(accounts);
    fs.writeFileSync(resolve(__dirname, './json/accounts.json'), accountsJSON, "UTF8");
    res.render('transfer', { message: "Transfer Completed" })
})
app.get('/payment', (req, res) => {
    res.render('payment', { account: accounts.credit })
})
app.post('/payment', (req, res) => {
    const amount = req.body.amount;
    accounts.credit.balance -= parseInt(amount);
    accounts.credit.available += parseInt(amount);
    const accountsJSON = JSON.stringify(accounts);
    fs.writeFileSync(resolve(__dirname, './json/accounts.json'), accountsJSON, "UTF8");
    res.render('payment', { message: "Payment Successful", account: accounts.credit })
})

app.listen(3000, () => {
    console.log("server is listening on port 3000.")
})