import express from "express";
import api from "./server/routes/authorizationRoutes.js";
import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import dbconnection from "./server/db/dbconnection.js";

const PORT = 3000;

const app = express();
const admin = new AdminJS({});
const adminRouter = AdminJSExpress.buildRouter(admin);

app.use(express.json());
app.use(admin.options.rootPath, adminRouter);
app.use(api);

app.get("/", (req, res) => {
  res.send({ message: "Hello WWW!" });
});

dbconnection.connection();

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
