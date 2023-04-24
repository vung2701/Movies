const { multiMongooseToObject } = require("../../until/mongoose");
const Film = require("../models/Film");

class SiteController {
    // [GET] / Home
    async home(req, res, next) {
        const account = req.account;
        const limit = 3; // number of items to display per page
        const page = req.query.page || 1; // current page number
        try {
            const films = await Film.find({})
                .skip(limit * page - limit)
                .limit(limit);
            const count = await Film.countDocuments();
            const totalPages = Math.ceil(count / limit);
            const isPager = totalPages > 1;
            res.render("home", {
                account: JSON.stringify(account),
                currentPage: page,
                totalPages,
                limit,
                isPager,
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new SiteController();
