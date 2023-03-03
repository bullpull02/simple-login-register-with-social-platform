const validateUser = async (req, res, next) => {
  if (req.session && req.session.user) {
    next();
  } else {
    let authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token) return res.json({ message: "No response" });
    jwt.verify(token, secret, (error, user) => {
      if (error) return res.json({ message : error});
      req.user = user;
      next();
    });
  }
};
module.exports = validateUser;