const { Router } = require('express');
const attendeeController = require('../controllers/attendeeController');
const router = Router();
const {requireAuth} = require('../middleware/auth');
 


router.get('/attendees', requireAuth, attendeeController.getAllAttendees);
router.get('/attendee/:id', attendeeController.getAttendee);
router.get('/attendee/', attendeeController.getCreateAttendee);
router.post('/attendee',  attendeeController.postAttendee);
router.get('/attendee/edit', attendeeController.getEditAttendee);
router.patch('/attendee/:id', attendeeController.postEditAttendee);
router.get('/attendee/:id', attendeeController.getDeleteAttendee);
router.delete('/attendee/:id', attendeeController.deleteAttendee); 
router.get('/attendeelist/:event', attendeeController.getEventAttendees); 



module.exports = router;