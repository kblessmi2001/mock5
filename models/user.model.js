const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    label: String,
    booked_slots: [String]

},
    {
        versionKey: false
    })

const UserModel = mongoose.model("User", userSchema)
module.exports = UserModel