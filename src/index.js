const express = require("express");
const handlebars = require("express-handlebars");
const path = require("path");
const route = require("./routes");
// const morgan = require("morgan");
const db = require("./config/db");
const methodOverride = require("method-override");
const SortMiddleware = require("./app/middlerwares/SortMiddleware");
const cookieParser = require("cookie-parser");
const Account = require("./app/models/Account");
const app = express();
const port = 3000;

app.use(cookieParser());

// connect to the database
db.connect();

// custom middlewares
app.use(SortMiddleware);

// POST from form
app.use(
    express.urlencoded({
        extended: true,
    }),
);
// POST from js
app.use(express.json());

// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// public folder
app.use(express.static(path.join(__dirname, "public")));

// Template Engine
app.engine(
    ".hbs",
    handlebars.engine({
        extname: ".hbs",
        helpers: {
            sum: (a, b) => a + b,
            sortable: (field, sort) => {
                const sortType = field === sort.column ? sort.type : "default";
                const icons = {
                    default: "fa-solid fa-sort",
                    asc: "fa-solid fa-arrow-down-a-z",
                    desc: "fa-solid fa-arrow-down-z-a",
                };

                const types = {
                    default: "desc",
                    asc: "desc",
                    desc: "asc",
                };

                const icon = icons[sortType];
                const type = types[sortType];

                return `<a href="?_sort&column=${field}&type=${type}">
                            <i class='${icon} ml-2'></i>
                        <a >`;
            },
            object: (context) => JSON.parse(context),
            isAdmin: (account) => account.role === "admin",
        },
    }),
);

app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "resources/views"));

// logger
// app.use(morgan("combined"));

// router init
route(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
