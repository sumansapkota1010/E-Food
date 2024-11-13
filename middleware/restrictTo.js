const restrictTo = (...roles) => {
  return (req, res, next) => {
    console.log(roles);
    console.log(req.user.role);
    //req.user
    const userRole = req.user.role;
    if (!roles.includes(userRole)) {
      res.status(403).json({
        message: "You don't have permission to do this.",
      });
    } else {
      next();
    }
  };
};

module.exports = restrictTo;
