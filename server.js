import express from "express";
import cookies from "cookie-parser";
import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";

import authorizationRouter from "./server/routes/authorizationRouter.js";
import userRouter from "./server/routes/userRouter.js";

const PORT = 3000;

const app = express();
const admin = new AdminJS({});
const adminRouter = AdminJSExpress.buildRouter(admin);

app.use(express.json());
app.use(cookies());
app.use(admin.options.rootPath, adminRouter);

app.use("/api/auth", authorizationRouter);
app.use("/api/users", userRouter);

app.get("/", (req, res) => {
  res.send({ message: "Hello WWW!" });
});

app.listen(PORT, () => {
  console.log(
    `AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`
  );
});

// uapi.get("/account", permit('manager', 'employee'),  (req, res) => res.json({currentUser: req.user}));

// export default function permit(...permittedRoles) {
//     return (request, response, next) => {
//       const { user } = request

//       if (user && permittedRoles.includes(user.role)) {

//       } else {
//         response.status(403).json({message: "Acsess Forbidden"});
//       }
//     }
//   }
