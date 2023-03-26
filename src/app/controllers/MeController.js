const { multiMongooseToObject } = require("../../until/mongoose");
const Film = require("../models/Film");
class MeController {
    // [GET] /me/stored-films
    storedFilms(req, res, next) {
        let filmQuery = Film.find({});
        const account = req.account;

        if (req.query.hasOwnProperty("_sort")) {
            filmQuery = filmQuery.sort({
                [req.query.column]: req.query.type,
            });
        }
        Promise.all([filmQuery, Film.countDocumentsDeleted()])
            .then(([films, deletedFilmsCount]) =>
                res.render("me/stored-films", {
                    films: multiMongooseToObject(films),
                    deletedFilmsCount,
                    account: JSON.stringify(account),
                }),
            )
            .catch(next);
    }

    // [GET] /me/trash-films
    trashFilms(req, res, next) {
        const account = req.account;

        Film.findDeleted({})
            .then((films) =>
                res.render("me/trash-films", {
                    films: multiMongooseToObject(films),
                    account: JSON.stringify(account),
                }),
            )
            .catch(next);
    }

    // [GET] /me/profile
    profile(req, res, next) {
        const account = req.account;
        res.render("me/profile", { account: JSON.stringify(account) });
    }
}
module.exports = new MeController();
