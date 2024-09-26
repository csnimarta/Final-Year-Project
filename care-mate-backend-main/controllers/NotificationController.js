const Notification = require('../models/Notification');

const storeNotification = async (req, res) => {
    const {title, user, message} = req.body;
    try {
        const newNotification = new Notification({
            title, user, message
        });

        const storedNotification = await newNotification.save();
        res.status(201).json(storedNotification);
    } catch (error) {
        console.log("Could not send notification: " + error);
        res.status(500).json({message: 'Internal server error'});
    }
};

const getNotificationsByUser = async (req, res) => {

    const {user} = req.query;

    try {
        const notifications = await Notification.find({user});
        res.status(200).json(notifications ? notifications.reverse() : []);
    } catch (error) {
        console.log("Could not retrieve error: " + error);
        res.status(500).json({message: 'Internal server error'});
    }

};

module.exports = {storeNotification, getNotificationsByUser};