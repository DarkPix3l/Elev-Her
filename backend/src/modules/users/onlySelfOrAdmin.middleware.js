export const onlySelfOrAdmin = (req, res, next) => {
  if (
    //if u are an admin or you're acting your own id, you can pass
    req.user.role === "admin" ||
    req.user._id.toString() === req.params.id
  ) {
    return next();
  }
  return res.status(403).json({ message: "Access denied." });
};