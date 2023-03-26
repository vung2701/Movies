const { mongooseToObject } = require("../../until/mongoose");
const Film = require("../models/Film");

class FilmsController {
    //[GET] /films/:slug
    detail(req, res, next) {
        const account = req.account;
        Film.findOne({ slug: req.params.slug })
            .then((film) =>
                res.render("films/detail", {
                    film: mongooseToObject(film),
                    account: JSON.stringify(account),
                }),
            )
            .catch(next);
    }

    // [GET] /films/create
    create(req, res, next) {
        const account = req.account;
        res.render("films/create", { account: JSON.stringify(account) });
    }

    // [POST] /films/store
    store(req, res, next) {
        const film = new Film(req.body);
        film.save()
            .then(() => res.redirect("/me/stored-films"))
            .catch(next);
    }

    // [GET] /films/edit/:id
    edit(req, res, next) {
        const account = req.account;
        Film.findOne({ id: req.params.id })
            .then((film) =>
                res.render(`films/edit`, {
                    film: mongooseToObject(film),
                    account: JSON.stringify(account),
                }),
            )
            .catch(next);
    }

    // [PUT] /films/update/:id
    update(req, res, next) {
        Film.findByIdAndUpdate(req.params.id, { ...req.body })
            .then(() => res.redirect("/me/stored-films"))
            .catch(next);
    }

    // [PATCH] /films/restore/:id
    restore(req, res, next) {
        Film.restore({ _id: req.params.id })
            .then(() => res.redirect("back"))
            .catch(next);
    }

    // [DELETE] /films/delete/:id
    delete(req, res, next) {
        Film.delete({ _id: req.params.id })
            .then(() => res.redirect("back"))
            .catch(next);
    }

    // [DELETE] /films/destroy/:id
    destroy(req, res, next) {
        Film.deleteOne({ _id: req.params.id })
            .then(() => res.redirect("back"))
            .catch(next);
    }

    // [ACTION] /films/handle-form-actions
    handleFormActions(req, res, next) {
        switch (req.body.action) {
            case "delete":
                Film.delete({ _id: req.body.filmIds })
                    .then(() => res.redirect("back"))
                    .catch(next);
                break;
            case "restore":
                Film.restore({ _id: req.body.filmIds })
                    .then(() => res.redirect("back"))
                    .catch(next);
                break;
            case "destroy":
                Film.deleteMany({ _id: req.body.filmIds })
                    .then(() => res.redirect("back"))
                    .catch(next);
                break;
            default:
                res.send("Invalid form action");
        }
    }
}

module.exports = new FilmsController();
