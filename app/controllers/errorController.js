// eslint-disable-next-line no-unused-vars
const errorController = (error, request, response, next) => {
  const status = error.status || 500;
  const responseJson = {
    status: 'error',
    code: status,
    message: error.message,
  };
  if (process.env.NODE_ENV === 'development') {
    responseJson.data = error.stack;
  }
  response.status(status).json(responseJson);
};

module.exports = errorController;
