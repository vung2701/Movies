const Account = require("../models/Account");
class ProfileController {
    // [GET] /profile
    detail(req, res, next) {
        const account = req.account;
        res.render("profile/detail", {
            account: JSON.stringify(account),
        });
    }

    // [GET] /profile/upload
    upload(req, res, next) {
        const account = req.account;
        res.render("profile/upload", {
            account: JSON.stringify(account),
        });
    }

    // [PUT] /profile/upload
    save(req, res, next) {
        Account.findOneAndUpdate(
            { username: req.account.username },
            {
                ...req.body,
            },
        )
            .then((account) => {
                req.account = account;
                res.redirect("/profile");
            })
            .catch(next);
    }
}
module.exports = new ProfileController();
