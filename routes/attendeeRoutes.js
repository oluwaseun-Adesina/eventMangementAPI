const { Router } = require('express');
const attendeeController = require('../controllers/attendeeController');
const router = Router();
const { requireAuth } = require('../middleware/auth');



router.get('/attendees', requireAuth, attendeeController.getAllAttendees);
router.get('/attendees/create', requireAuth, attendeeController.getCreateAttendee);

router.post('/attendees/create', requireAuth, attendeeController.postAttendee);

router.get('/attendees/single/:attendeeId', requireAuth, attendeeController.getSingleAttendee);
router.get('/attendees/edit/:attendeeId', requireAuth, attendeeController.getEditAttendee);
router.patch('/attendees/edit/:attendeeId', requireAuth, attendeeController.postEditAttendee);
router.get('/attendees/delete/:attendeeId', requireAuth, attendeeController.getDeleteAttendee);
router.delete('/attendees/delete/:attendeeId', requireAuth, attendeeController.deleteAttendee);

router.get('/events/:eventId/attendees', requireAuth, attendeeController.getEventAttendees);
router.get('/attendee/:attendeeId/events', requireAuth, attendeeController.getEventsByAttendees)
// count attendees by event
router.get('/attendees/:eventId/count', requireAuth, attendeeController.countAttendeesByEvent)



module.exports = router;