const express = require("express");
const router = express.Router();

const {storeNotification, getNotificationsByUser} = require("../controllers/NotificationController");

router.post('/', storeNotification);
router.get('/user', getNotificationsByUser);

module.exports = router;