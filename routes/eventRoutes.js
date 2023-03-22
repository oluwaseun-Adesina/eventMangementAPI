const { Router } = require('express');
const eventController = require('../controllers/eventController');
const router = Router();
const {requireAuth, checkRole} = require('../middleware/auth');
const { canViewEvent, canDeleteEvent, canEditEvent, canCreateEvents, scopedEvents } = require('../permissions/eventsPermission');
const { ROLES }= require('../models/User')
role = ROLES.Admin;


router.get('/events', requireAuth, checkRole, scopedEvents, eventController.getAllEvents);
router.get('/events/new', requireAuth, eventController.getCreateEvent);
router.post('/events/new', requireAuth, eventController.postCreateEvent)
// change event status
router.patch('/events/status/:id', requireAuth, checkRole, eventController.postChangeStatus);

// get approved events
router.get('/events/approved', requireAuth, checkRole, eventController.getApprovedEvents);

// get pending events
router.get('/events/pending', requireAuth, checkRole ,eventController.getPendingEvents);

// get rejected events
router.get('/events/rejected', requireAuth, checkRole,eventController.getRejectedEvents);


router.get('/events/:id',requireAuth, eventController.getEvent);;
router.get('/events/edit/:id', requireAuth,authEditEvent,eventController.getEditEvent);
router.patch('/events/edit/:id', requireAuth, authEditEvent, eventController.postEditEvent);
router.get('/event/delete/:id', requireAuth, authDeleteEvent,eventController.getDeleteEvent);
router.delete('/event/delete/:id', requireAuth, authDeleteEvent, eventController.postDeleteEvent); 

// function authGetEvent (req, res, next) {
//     if (!canViewEvent(req.user, req.event)) {
//         return res.status(401).json({message: "You are not authorized to view this event"})
//     }

//     next()
// }

// function setEvent (req, res, next) {
//     req.event = req.user.events.find(event => event.id === req.params.id)
//     if (req.event === undefined) {
//         return res.status(404).json({message: "Event not found"})
//     }
//     next()
// }

function authDeleteEvent (req, res, next) {
    if (!canDeleteEvent(req.user, req.event)) {
        return res.status(401).json({message: "You are not authorized to delete this event"})

    }
    next()
}

function authEditEvent (req, res, next) {
    if (!canEditEvent(req.user, req.event)) {
        return res.status(401).json({message: "You are not authorized to edit this event"})
    }
    next()
}

function authScopeEvent (req, res, next) {
    if (!scopedEvents(req.user)) {
        return res.status(401).json({message: "You are not authorized to create events"})
    }
    next()
}

module.exports = router;