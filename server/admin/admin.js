import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import AdminJSSequelize from "@adminjs/sequelize";
import Test from "../models/Test.js";

AdminJS.registerAdapter(AdminJSSequelize);

const adminJsOptions = {
  resources: [
    {
      resource: Test,
      options: {
        properties: {
          pass: {
            isVisible: { list: false, show: false, edit: true, filter: false },
          },
          // Другие настройки свойств
        },
      },
    },
  ],
};

const admin = new AdminJS(adminJsOptions);

const authenticate = async () => {
  return { email: "t@t.t" };
};

const adminRouter = AdminJSExpress.buildAuthenticatedRouter(admin, {
  authenticate,
  cookiePassword: "very_secret_secret",
});

export default { 
  path: admin.options.rootPath, 
  router: adminRouter 
};