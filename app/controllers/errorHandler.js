function handleErrorsFor(middleware) {
  return async (request, response, next) => {
    try {
      await middleware(request, response, next);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = handleErrorsFor;
