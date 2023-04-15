const { multiMongooseToObject } = require("../../until/mongoose");
const Film = require("../models/Film");

class SiteController {
    // [GET] / Home
    async home(req, res, next) {
        res.redirect("/films");
    }
}

module.exports = new SiteController();
