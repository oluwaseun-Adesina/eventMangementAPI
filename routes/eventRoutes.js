const { Router } = require('express');
const eventController = require('../controllers/eventController');
const router = Router();
const {requireAuth} = require('../middleware/auth');
 


router.get('/events', requireAuth, eventController.getAllEvents);
router.get('/events/new', requireAuth, eventController.getCreateEvent);
router.post('/events/new', requireAuth, eventController.postCreateEvent)
router.get('/events/:id',requireAuth, eventController.getEvent);;
router.get('/events/edit/:id', requireAuth, eventController.getEditEvent);
router.patch('/events/edit/:id', requireAuth, eventController.postEditEvent);
router.get('/event/delete/:id', requireAuth, eventController.getDeleteEvent);
router.delete('/event/delete/:id', requireAuth, eventController.postDeleteEvent); 



module.exports = router;