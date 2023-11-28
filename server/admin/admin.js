import Config from "../configs.json" assert { type: "json" };
import DbUser from "../db/scheme/user.js";
import DbCategory from "../db/scheme/categories.js";
import DbComents from "../db/scheme/comments.js";

import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import AdminJSSequelize from "@adminjs/sequelize";
import DbComments from "../db/scheme/comments.js";

AdminJS.registerAdapter(AdminJSSequelize);

const adminJsOptions = {
  resources: [
    {
      resource: DbUser,
      options: {
        properties: {
          pass: {
            isVisible: { list: false, show: false, edit: true, filter: false },
          },
        },
      },
    },
    {
      resource: DbCategory,
      options: {
        properties: {
          pass: {
            isVisible: { list: false, show: false, edit: true, filter: false },
          },
        },
      },
    },
    {
      resource: DbComments,
      options: {
        properties: {
          pass: {
            isVisible: { list: false, show: false, edit: true, filter: false },
          },
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
