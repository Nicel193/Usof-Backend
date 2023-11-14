export default function (roles) {
  return function (req, res, next) {
    if (!req.user) {
      res.status(401).json("UnauthorizedError");
      return;
    }

    roles.forEach((role) => {
      if (role !== req.user.role) {
        res.status(401).json("No rights");
        return;
      }
    });

    next();
  };
}
