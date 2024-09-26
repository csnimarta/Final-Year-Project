const Order = require("../models/Order");
const User = require("../models/User");
// import {Safepay} from '@sfpy/node-sdk';
const { Safepay } = require("@sfpy/node-sdk");

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getOrdersByServiceProvider = async (req, res) => {
  const { user } = req.query;
  try {
    const orders = await Order.find({ serviceProvider: user });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createOrder = async (req, res) => {
  const {
    serviceProvider,
    serviceConsumer,
    orderDate,
    deliveryDate,
    cost,
    durationType,
    markedComplete,
    orderCancel,
    paymentType,
    exactAddress,
    serviceProviderName,
    serviceConsumerName,
    serviceCategoryName,
    serviceProviderPhone,
    serviceConsumerPhone,
    hasReceivedFeedback,
  } = req.body;
  try {
    const newOrder = new Order({
      serviceProvider,
      serviceConsumer,
      orderDate,
      deliveryDate,
      cost,
      durationType,
      markedComplete,
      orderCancel,
      paymentType,
      exactAddress,
      serviceProviderName,
      serviceConsumerName,
      serviceCategoryName,
      serviceProviderPhone,
      serviceConsumerPhone,
      hasReceivedFeedback,
    });

    const storedOrder = await newOrder.save();

    res.status(201).json(storedOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateOrder = async (req, res) => {
  const { id } = req.query;
  const {
    serviceProvider,
    serviceConsumer,
    orderDate,
    deliveryDate,
    cost,
    durationType,
    markedComplete,
    orderCancel,
    paymentType,
    exactAddress,
    serviceProviderName,
    serviceConsumerName,
    serviceCategoryName,
    serviceProviderPhone,
    serviceConsumerPhone,
    hasReceivedFeedback,
  } = req.body;
  try {
    await Order.findByIdAndUpdate(id, {
      serviceProvider,
      serviceConsumer,
      orderDate,
      deliveryDate,
      cost,
      durationType,
      markedComplete,
      orderCancel,
      paymentType,
      exactAddress,
      serviceProviderName,
      serviceConsumerName,
      serviceCategoryName,
      serviceProviderPhone,
      serviceConsumerPhone,
      hasReceivedFeedback,
    });

    console.log(req.query);

    const storedOrder = await Order.findById(id);

    res.status(200).json({ storedOrder });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getOrderById = async (req, res) => {
  const { id } = req.query;
  try {
    const order = await Order.findById(id);
    res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching order by id:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteOrder = async (req, res) => {
  const { id } = req.query;

  try {
    await Order.findByIdAndDelete(id);
    res.status(201).json({ message: "deleted successfully", _id: id });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const payOnline = async (req, res) => {
  const { amount, orderId } = req.body;
  try {
    const safepay = new Safepay({
      environment: "sandbox",
      apiKey: "sec_47a01e8a-9750-49a7-ad7b-6a500290721c",
      v1Secret:
        "d10549df6f28d63c1c810a6353e2401607f935a057ffdb7e107a25850d3166b7",
      webhookSecret: "foo",
    });

    const { token } = await safepay.payments.create({
      currency: "PKR",
      amount: amount ? amount : 2300,
    });
    // Pass 'token' to create checkout link

    const url = safepay.checkout.create({
      token,
      orderId: "T801",
      cancelUrl:
        "https://66659a9f34c3cfbea4124618--vocal-creponne-ae90cb.netlify.app/payment_error",
      redirectUrl:
        "https://66659a9f34c3cfbea4124618--vocal-creponne-ae90cb.netlify.app/payment_succesful",
      source: "custom",
      webhooks: true,
    });

    res.status(200).json({ message: "paid successfully", url });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder,
  payOnline,
  getOrdersByServiceProvider,
  getOrderById,
};
