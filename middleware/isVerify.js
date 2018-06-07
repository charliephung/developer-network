module.exports = (req, res, next) => {
  if (req.user) {
    if (req.user.verify === false) {
      return res
        .status(401)
        .json({
          msg: `${
            req.user.email
          } is not verified. Please verify your account first.`,
          verify: false
        });
    }
  }

  next();
};
