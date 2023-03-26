const { json } = require("express");
const { multiMongooseToObject } = require("../../until/mongoose");
const Film = require("../models/Film");
class SearchController {
    // [GET] / search
    index(req, res, next) {
        const account = req.account;
        res.render("search", { account: JSON.stringify(account) });
    }

    // [POST] / search
    search(req, res, next) {
        let key = req.body.key;
        const account = req.account;

        Film.find({
            $or: [
                { title: { $regex: `${req.body.key}` } },
                { actor: { $regex: `${req.body.key}` } },
                { genre: { $regex: `${req.body.key}` } },
            ],
        })
            .then((films) =>
                res.render("search", {
                    key,
                    films: multiMongooseToObject(films),
                    account: JSON.stringify(account),
                }),
            )
            .catch(next);
    }
}

module.exports = new SearchController();
