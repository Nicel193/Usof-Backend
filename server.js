import express from "express";
import cookies from "cookie-parser";
import admin from "./server/admin/admin.js";
import avatarsPath from "./server/services/avatarService.js";

import authRouter from "./server/routes/authorizationRouter.js";
import userRouter from "./server/routes/userRouter.js";
import categoriesRouter from "./server/routes/categoriesRouter.js";
import postRouter from "./server/routes/postRouter.js";
import commentRouter from "./server/routes/commentRouter.js";

const PORT = 3001;
const app = express();

app.use(express.json());
app.use(cookies());
app.use(admin.path, admin.router);
app.use('/avatars', express.static(avatarsPath));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Vary', 'Origin');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);

app.listen(PORT, () => {
  console.log(`Server start on http://localhost:${PORT}`);
});
