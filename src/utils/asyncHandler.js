// this one is with promises
const asyncHandler = (requestHandler) => {
  (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};


export { asyncHandler };

// const asyncHandler = () => {}
// const asyncHandler = (fn) => () => {}
// const asyncHandler = (fn) => async() => {}

/* this one is with tryCatch
const asyncHandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next)
  } catch (error) {
    res.send(error.code || 500).json({
      success: false,
      message: error.message,
    });
  }
};
*/
