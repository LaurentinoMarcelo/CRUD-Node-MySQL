const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql')

const app = express()

app.use(
    express.urlencoded({
        extended: true,
    })
)

app.use(express.json())

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('home')
})

app.post('/books/insertbook', (req, res) => {

    const title = req.body.title
    const pageqty = req.body.pagesqty

    const sql = `INSERT INTO books (title, pageqty) VALUES ('${title}', '${pageqty}')`

    conn.query(sql, function (err) {
        if (err) {
            console.log(err)
        }
        res.redirect('/books')
    })
})

app.get('/books', (req, resp) => {
    const sql = "SELECT * FROM books"

    conn.query(sql, function (err, data) {
        if (err) {
            console.log(err);
            return
        }

        const books = data

        console.log(books)

        resp.render('books', { books })
    })
})

app.get('/books/:idBooks', (req, resp) => {

    const id = req.params.idBooks

    const sql = `SELECT * FROM books WHERE idBooks =  ${id}`

    conn.query(sql, function (err, data) {
        if (err) {
            console.log(err);
            return
        }

        const book = data[0]

        console.log(book)

        resp.render('book', { book })
    })
})

app.get('/books/edit/:idBooks', (req, resp) => {

    const id = req.params.idBooks

    const sql = `SELECT * FROM books WHERE idBooks =  ${id}`

    conn.query(sql, function (err, data) {
        if (err) {
            console.log(err);
            return
        }

        const book = data[0]

        console.log(book)

        resp.render('editbook', { book })
    })
})

app.post('/books/updatedbook', (req, res) => {

    const id = req.body.idBooks
    const title = req.body.title
    const pageqty = req.body.pageqty

    const sql = `UPDATE books SET title = '${title}', pageqty = '${pageqty}' WHERE idBooks = ${id}`

    conn.query(sql, function (err) {
        if (err) {
            console.log(err)
        }
        res.redirect('/books')
    })
})

app.post('/books/remove/:idBooks', (req, res) => {

    const id = req.params.idBooks

    const sql = `DELETE FROM books WHERE idBooks = ${id}`

    conn.query(sql, function (err) {
        if (err) {
            console.log(err)
        }
        res.redirect('/books')
    })
})

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodemysql',
})

conn.connect(function (err) {
    if (err) {
        console.log(err)
    }
    console.log("Conectou ao MySQL!")
    app.listen(3000)

})