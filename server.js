import express from "express";
import cookies from "cookie-parser";
import admin from "./server/admin/admin.js";

import authRouter from "./server/routes/authorizationRouter.js";
import userRouter from "./server/routes/userRouter.js";
// import postRouter from "./server/routes/postRouter.js";

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(cookies());
app.use(admin.path, admin.router);

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
// app.use("/api/posts", postRouter);

app.listen(PORT, () => {
  console.log(
    `AdminJS started on http://localhost:${PORT}${admin.path}`
  );
});
