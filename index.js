const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const route = require('./routes');
const db = require('./config/db');

//connect db
db.connect();

const app = express();
const port = 3000;
const rootPath = __dirname.replace('\\src', '');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// cấu hình để dùng các file static
app.use(express.static(path.join(__dirname, 'public')));
// cấu hình đường dẫn đến các file trong node modules
app.use('/css', express.static(path.join(rootPath, 'node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(rootPath, 'node_modules/bootstrap/dist/js')))
// app.use('/js', express.static(path.join(rootPath, 'node_modules/jquery/dist')))

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'resources/views'));

app.get("/", (req, res) => {
    res.render("home");
});

// config routes
route.config(app);

app.listen(port, () => {
    console.log(`listening on port ${port}.`);
});
