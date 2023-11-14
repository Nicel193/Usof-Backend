import express from "express";
import cookies from "cookie-parser";
import admin from "./server/admin/admin.js";

import authMiddleware from "./server/middleware/authMiddleware.js";
import roleMiddleware from "./server/middleware/roleMiddleware.js";

import authRouter from "./server/routes/authorizationRouter.js";
import userRouter from "./server/routes/userRouter.js";
import categoriesRouter from "./server/routes/categoriesRouter.js"
import postRouter from "./server/routes/postRouter.js";
import commentRouter from "./server/routes/commentRouter.js";

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(cookies());
app.use(admin.path, admin.router);

app.use("/api/auth", authRouter);
app.use("/api/users", authMiddleware, roleMiddleware(['admin']), userRouter);
app.use("/api/categories", authMiddleware, roleMiddleware(['admin']), categoriesRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);

app.listen(PORT, () => {
  console.log(
    `AdminJS started on http://localhost:${PORT}${admin.path}`
  );
});
