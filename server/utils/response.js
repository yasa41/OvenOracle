export const success = (
  res,
  data = null,
  message = "Success",
  status = 200
) => {
  return res.status(status).json({
    success: true,
    message,
    data,
  });
};

export const error = (
  res,
  message = "Something went wrong",
  status = 500,
  data = null
) => {
  return res.status(status).json({
    success: false,
    message,
    data,
  });
};
