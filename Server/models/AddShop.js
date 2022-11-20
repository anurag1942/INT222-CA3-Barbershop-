const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema({
    shopname: {
        type: String,
        required: true,
    },
    shopaddress: {
        type: String,
        required: true,
    },
    shopphone: {
        type: String,
        required: true,
    },
    shopemail: {
        type: String,
        required: true,
    },
    shopimage: {
        type: String,
        required: true,
    },
    shopdescription: {
        type: String,
        required: true,

    },
    shopowner: {
        type: String,
        required: true,

    },
    shoppincode: {
        type: String,
        required: true,
    }
})




mongoose.model("Shop", shopSchema);