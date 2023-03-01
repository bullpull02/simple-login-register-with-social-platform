const responseModify = (res, status, message, data) => {
  return res.json({ status, message, data });
};
module.exports = responseModify;
