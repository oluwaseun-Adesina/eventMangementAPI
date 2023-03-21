const { Router } = require('express');
const authController = require('../controllers/authController');

const router = Router();

// router.get('/signup', authController.signup_get);
router.post('/signup', authController.signup_post);
// router.get('/login', authController.login_get);
router.post('/login', authController.login_post);
router.get('/logout', authController.logout_get);
router.patch('/update', authController.updateUser);


// router.get('/signup', authController.signup);
// router.post('/signup', authController.signup);
// router.get('/login', authController.login);
// router.post('/login', authController.login);
// router.get('/logout', authController.logout);


module.exports = router;