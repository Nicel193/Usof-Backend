export default function (roles) {
  return function (req, res, next) {
    if (!req.user) {
      res.status(401).json("UnauthorizedError");
      return;
    }

    let found = false;

    roles.forEach((role) => {
      if (role === req.user.roles) {
        found = true;
        return;
      }
    });

    if (found) {
      next();
    } else {
      return res.status(403).json("No rights");
    }
  };
}
