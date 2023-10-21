const express = require("express");
const authRouter = require("./routes/v1/auth.routes");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const usersRouter = require("./routes/v1/user.routes");
const categorieRouter = require("./routes/v1/categorie.routes");
const coursesRouter = require("./routes/v1/course.routes");
const commentsRouter = require("./routes/v1/comment.routes");
const contanctRouter = require("./routes/v1/contanct.routes");
const newsletterRouter = require("./routes/v1/newsletter.routes");
const searchRouter = require("./routes/v1/search.routes");
const notificationsRouter = require("./routes/v1/notification.routes");
const offsRouter = require("./routes/v1/off.routes");
const ordersRouter = require("./routes/v1/order.routes");
const ticketsRouter = require("./routes/v1/ticket.routes");

const app = express();
app.use("/courses/covers", express.static(path.join(__dirname, "public", "courses", "covers")));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/v1/auth", authRouter);
app.use("/v1/users", usersRouter);
app.use("/v1/categorie", categorieRouter);
app.use("/v1/courses", coursesRouter);
app.use("/v1/comments", commentsRouter);
app.use("/v1/contacts", contanctRouter);
app.use("/v1/newsletters", newsletterRouter);
app.use("/v1/search", searchRouter);
app.use("/v1/notifications", notificationsRouter);
app.use("/v1/offs", offsRouter);
app.use("/v1/orders", ordersRouter);
app.use("/v1/tickets", ticketsRouter);

module.exports = app;
