const siteRouter = require("./site");
const filmsRouter = require("./films");
const searchRouter = require("./search");
const meRouter = require("./me");
const validateRouter = require("./validate");
const CheckToken = require("../app/middlerwares/CheckToken");

function route(app) {
    app.use("/validate", validateRouter);

    app.use("/me", CheckToken, meRouter);

    app.use("/films", CheckToken, filmsRouter);

    app.use("/search", CheckToken, searchRouter);

    app.use("/", CheckToken, siteRouter);
}
module.exports = route;
