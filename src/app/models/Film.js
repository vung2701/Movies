const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-generator");
const mongooseDelete = require("mongoose-delete");

const Film = new Schema(
    {
        title: { type: String, require: true },
        year: { type: Number },
        genre: { type: String },
        actor: { type: String },
        rating: { type: Number },
        plot: { type: String },
        videoId: { type: String },
        director: { type: String },
        slug: { type: String, slug: "title", unique: true },
    },
    {
        timestamps: true,
    },
);
// add plugin
mongoose.plugin(slug);
Film.plugin(mongooseDelete, { deletedAt: true, overrideMethods: "all" });
module.exports = mongoose.model("Film", Film);
