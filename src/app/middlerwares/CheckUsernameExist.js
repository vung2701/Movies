const Account = require("../models/Account");

const CheckUsernameExists = async (req, res, next) => {
    const { username } = req.body;
    let isExists = false;
    try {
        const account = await Account.findOne({ username });
        if (account) {
            return res.render("validate/register", {
                layout: "validate",
                isExists: true,
            });
        } else {
            isExists = false;
            next();
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = CheckUsernameExists;
