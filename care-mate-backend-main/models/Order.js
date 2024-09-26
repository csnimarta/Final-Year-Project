const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    serviceProvider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    serviceConsumer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    orderDate: {
        type: String,
        required: true,
    },
    deliveryDate: {
        type: String,
        required: true,
    },
    cost: {
        type: String,
        required: true
    },
    durationType: {
        type: String,
        required: true
    },
    markedComplete: {
        type: Boolean,
        required: true,
        default: false
    },
    orderCancel: {
        type: Boolean,
        required: true,
        default: false
    },
    paymentType: {
        type: String,
        required: true,
        enums: ['cod', 'online'],
        default: 'cod'
    },
    exactAddress: {
        type: String,
        required: true,
    },
    cancellationReason: {
        type: String,
        required: false,
    },
    serviceProviderName: {
        type: String,
        required: true,
    },
    serviceConsumerName: {
        type: String,
        required: true,
    },
    serviceCategoryName: {
        type: String,
        required: true,
    },
    serviceProviderPhone: {
        type: String,
        required: true
    },
    serviceConsumerPhone: {
        type: String,
        required: true
    },
    hasReceivedFeedback: { 
        type: Number,
    },
}, {
    timestamps: true
});

const orderModel = mongoose.model("Order", OrderSchema);
module.exports = orderModel;