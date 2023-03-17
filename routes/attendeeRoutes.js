const { Router } = require('express');
const attendeeController = require('../controllers/attendeeController');
const router = Router();
const { requireAuth } = require('../middleware/auth');



router.get('/attendees', requireAuth, attendeeController.getAllAttendees);
router.get('/attendee', requireAuth, attendeeController.getCreateAttendee);
router.get('/attendee/single/:id', requireAuth, attendeeController.getSingleAttendee);
router.post('/attendee', requireAuth, attendeeController.postAttendee);
router.get('/attendee/edit/:id', requireAuth, attendeeController.getEditAttendee);
router.patch('/attendee/edit/:id', requireAuth, attendeeController.postEditAttendee);
router.get('/attendee/:id', requireAuth, attendeeController.getDeleteAttendee);
router.delete('/attendee/:id', requireAuth, attendeeController.deleteAttendee);
router.get('/attendeelist/:event', requireAuth, attendeeController.getEventAttendees);
router.get('/attendee/:attendeeId/events', requireAuth, attendeeController.getEventsByAttendees)
// count attendees by event
router.get('/attendee/:eventId/count', requireAuth, attendeeController.countAttendeesByEvent)



module.exports = router;