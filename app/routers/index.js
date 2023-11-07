const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const apiController = require('../controllers/apiController');
const errorController = require('../controllers/errorController');
const handleErrorsFor = require('../controllers/errorHandler');
const { authorize } = require('../auth');

const router = express.Router();

router.post('/register', handleErrorsFor(userController.register));
router.post('/login', handleErrorsFor(authController.login));
router.post('/refresh-token', handleErrorsFor(authController.tokenRefresh));

router.get(
  '/api/book',
  authorize('read', 'book'),
  handleErrorsFor(apiController.getBooks)
);

router.post(
  '/api/book',
  authorize('create', 'book'),
  handleErrorsFor(apiController.addBook)
);

router.use((request, response, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

router.use(errorController);

module.exports = router;
