const secret = "mysecretkey";
const jwt = require("jsonwebtoken");
const Account = require("../models/Account");

const CheckToken = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        res.redirect("/validate/login");
    }

    try {
        const decode = jwt.verify(token, "mysecretkey");
        const account = await Account.findOne({ _id: decode.id });
        if (account) {
            req.account = account;
            next();
        }
    } catch (err) {
        res.clearCookie("token");
        res.redirect("/validate/login");
    }
};

module.exports = CheckToken;
