const mongoose = require("mongoose");

const academySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required."]
    },
    address: {
        type: String,
        required: [true, "Address is required."]
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
});

const Academy = mongoose.model("Academy", academySchema);

module.exports = Academy;