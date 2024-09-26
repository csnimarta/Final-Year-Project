const express = require("express");
const mainRouter = express.Router();

const userRouter = require("./UserRoutes");
const areaRouter = require("./AreaRoutes");
const interestRouter = require("./InterestRoutes");
const otpRouter = require("./OtpRoutes");
const updateRouter = require("./UpdateRoutes");
const deactivateRouter = require("./DeactivateRoutes");
const categoryRouter = require("./CategoryRoutes");
const bookingRouter = require("./BookingRoutes");
const slotRouter = require("./SlotRoutes");
const serviceRouter = require("./ServiceRoutes");
const tokenRouter = require("./TokenRoutes");
const forgotPasswordRouter = require("./ForgotPasswordRoutes");
const complaintRouter = require("./complaintRoutes");
const orderRouter = require("./orderRoutes");
const notificationRouter = require("./NotificationRoutes");




mainRouter.use("/user", userRouter);
mainRouter.use("/area", areaRouter);
mainRouter.use("/interest", interestRouter);
mainRouter.use("/otp", otpRouter);
mainRouter.use("/update", updateRouter);
mainRouter.use("/deactivate", deactivateRouter);
mainRouter.use("/category", categoryRouter);
mainRouter.use("/service", serviceRouter);
mainRouter.use("/booking", bookingRouter);
mainRouter.use("/service", serviceRouter);
mainRouter.use("/slot", slotRouter);
mainRouter.use("/token", tokenRouter);
mainRouter.use("/forgot-password", forgotPasswordRouter);
mainRouter.use("/complaint", complaintRouter);
mainRouter.use("/order", orderRouter);
mainRouter.use("/notifications", notificationRouter);

module.exports = mainRouter;
