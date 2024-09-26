const mongoose = require("mongoose");

const Notification = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title of notification is required.']
    },
    message: {
        type: String,
        required: [true, 'Message of notification is required.']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, 'User of notification is required.']
    },
    isSeen: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const notificationModel = mongoose.model("Notifications", Notification);
module.exports = notificationModel;