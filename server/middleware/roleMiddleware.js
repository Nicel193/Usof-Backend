export default function (role) {
  return function (req, res, next) {
    if (!req.user) {
      res.status(401).json("UnauthorizedError");
      return;
    }

    if(role !== req.user.role){
        res.status(401).json("No rights");
        return;
    }

    next();
  };
}
