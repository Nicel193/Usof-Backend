import express from "express";
import cookies from "cookie-parser";
import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";

import authRouter from "./server/routes/authorizationRouter.js";
import userRouter from "./server/routes/userRouter.js";
import postRouter from "./server/routes/postRouter.js";

const PORT = 3000;

const app = express();
const admin = new AdminJS({});
const adminRouter = AdminJSExpress.buildRouter(admin);

app.use(express.json());
app.use(cookies());
app.use(admin.options.rootPath, adminRouter);

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);

app.listen(PORT, () => {
  console.log(
    `AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`
  );
});
