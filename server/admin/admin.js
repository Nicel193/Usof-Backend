import Config from "../configs.json" assert { type: "json" };
import DbUser from "../db/user.js";

import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import AdminJSSequelize from "@adminjs/sequelize";


AdminJS.registerAdapter(AdminJSSequelize);

const adminJsOptions = {
  resources: [
    {
      resource: DbUser,
      options: {
        properties: {
          pass: {
            isVisible: { list: false, show: false, edit: true, filter: false },
          }
        },
      },
    },
  ],
};

const admin = new AdminJS(adminJsOptions);

const authenticate = async () => {
  return { email: Config.adminPanel.email };
};

const adminRouter = AdminJSExpress.buildAuthenticatedRouter(admin, {
  authenticate,
  cookiePassword: Config.adminPanel.password,
});

export default { 
  path: admin.options.rootPath, 
  router: adminRouter 
};