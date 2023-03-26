const { multiMongooseToObject } = require("../../until/mongoose");
const Film = require("../models/Film");

class SiteController {
    // [GET] / Home
    home(req, res, next) {
        const account = req.account;
        Film.find({})
            .then((films) =>
                res.render("home", {
                    films: multiMongooseToObject(films),
                    account: JSON.stringify(account),
                }),
            )
            .catch(next);
    }
}

module.exports = new SiteController();
