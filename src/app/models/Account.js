const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-generator");
const mongooseDelete = require("mongoose-delete");

const Account = new Schema(
    {
        username: { type: String, required: true },
        password: { type: String, require: true },
        avatar: {
            type: String,
            default:
                "https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png",
        },
        role: {
            type: String,
            enum: ["admin", "user"],
            default: "user",
        },
        fullname: { type: String, default: "Not update" },
        age: { type: String, default: "Not update" },
        address: { type: String, default: "Not update" },
        contact: { type: String, default: "Not update" },
    },
    {
        timestamps: true,
    },
);
// add plugin
mongoose.plugin(slug);
Account.plugin(mongooseDelete, { deletedAt: true, overrideMethods: "all" });
module.exports = mongoose.model("Account", Account);
