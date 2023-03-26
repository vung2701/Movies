const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = "mysecretkey";
const Account = require("../models/Account");
class ValidateController {
    // [GET] /validate/login
    loginForm(req, res, next) {
        if (req.cookies) {
            res.clearCookie("token");
        }
        res.render("validate/login", { layout: "validate" });
    }

    // [GET] /validate/register
    registerForm(req, res, next) {
        res.render("validate/register", { layout: "validate" });
    }

    // [POST] /validate/login
    async login(req, res, next) {
        const { username, password } = req.body;
        try {
            let isLoginFalse = false;

            const account = await Account.findOne({
                username,
            });
            if (!account) {
                res.render("validate/login", {
                    isLoginFalse: true,
                    layout: "validate",
                });
            } else {
                const isMatch = await bcrypt.compare(
                    password,
                    account.password,
                );
                if (isMatch) {
                    const token = jwt.sign({ id: account._id }, secret, {
                        expiresIn: "1h",
                    });
                    res.cookie("token", token, { httpOnly: true });
                    res.redirect("/");
                } else {
                    res.render("validate/login", {
                        isLoginFalse: true,
                        layout: "validate",
                    });
                }
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    }

    // [POST] /validate/register
    async register(req, res, next) {
        const { username, password } = req.body;
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const account = new Account({ username, password: hashedPassword });
            await account.save();
            res.redirect("/validate/login");
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    }
}

module.exports = new ValidateController();
