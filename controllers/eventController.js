const Event = require("../models/Event");
const Attendee = require("../models/Attendee");


exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json({ title: "All Events", events });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error retrieving events" });
  }
};

exports.getEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);
  const attendees = await Attendee.find({ event: event.id });

  res.json({ event: event, title: "Event Details", attendees });
};
 
exports.getCreateEvent = (req, res) => { 
    res.send("getCreateEvent")
//   res.json({
//     message:
//       "Create a new event by entering the name, description, date, time, and location"
//   });
}; 

exports.postCreateEvent = async (req, res) => {
  const { name, description, date, time, location } = req.body;

  try {
    const event = new Event({
      name,
      description,
      date,
      time,
      location,
    //   organizer: req.user.id, 
    });
    await event.save();

    res.status(201).json(event,)
  } catch (error) {
    console.log(error);
    res.json({ message: "Error creating event", error: error });
  }
};

exports.getEditEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);
  res.json({ event: event, title: "Edit Event" });
  // res.render('edit', { event: event, title: 'Edit Event' });
};

exports.postEditEvent = async (req, res) => {
  let event = await Event.findById(req.params.id);
  event = Object.assign(event, req.body);
  try {
    await event.save();
    res.json( { message : "event updated successfully", event })
    // res.redirect(`/events/${event.id}`);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Error updating event" });
  }
};

exports.getDeleteEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);
  res.json({ event: event, title: "Delete Event" });
};

exports.postDeleteEvent = async (req, res) => {
    try{
        const event = await Event.findById(req.params.id);
        await event.remove();
        res.json({ message: "Event deleted successfully" });
    }
    catch(err){
        console.log(err);
        res.status(400).json({ message: "Error deleting event" });
    }
};

exports.getAttendEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);
  res.json({ event: event, title: "Attend Event" });
  // res.render('attend', { event: event, title: 'Attend Event' });
};

exports.postAttendEvent = async (req, res) => {
  const { name, email, phone, event } = req.body;

  try {
    const attendee = new Attendee({ name, email, phone, event });
    await attendee.save();
    res.status(201).json(attendee).redirect(`/events/${event}`);
  } catch (error) {
    res.status(400).json({ message: "Error creating attendee" });
  }
};

exports.getAttendees = async (req, res) => {
  const attendees = await Attendee.find().sort({ createdAt: -1 });
  res.json({ title: "All Attendees", attendees });
  // res.render('attendees', { title: 'All Attendees', attendees });
};

exports.getAttendee = async (req, res) => {
  const attendee = await Attendee.findById(req.params.id);
  res.json
}

// add attendee to event





// remove attendee from event

exports.getDeleteAttendee = async (req, res) => {
  const attendee = await Attendee.findById(req.params.id);
  res.json({ attendee: attendee, title: "Delete Attendee" });
};