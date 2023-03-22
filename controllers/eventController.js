const Event = require("../models/Event");
const Attendee = require("../models/Attendee");
const sendEmail = require('../email/email')
const { canViewEvent, canDeleteEvent } = require("../permissions/eventsPermission");


exports.getAllEvents = async (req, res) => {
  try {
    // const events = await Event.find().sort({ createdAt:  -1 });

    const events = await Event.find().sort({ createdAt: -1 }).select('-attendees');
    res.json({ title: "All Events", events });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error retrieving events" });
  }
};  

exports.getEvent = async (req, res) => {
  const event = await Event.findById(req.params.id).select('-attendees');
  const attendees = await Attendee.find({ event: event.id }).select('-event');

  res.json({ event: event, title: "Event Details", attendees });
};
 
exports.getCreateEvent = (req, res) => { 
    // res.send("getCreateEvent")
  res.json({
    message:
      "Create a new event by entering the name, description, date, time, and location"
  });
}; 

exports.postCreateEvent = async (req, res) => {
  const { name, description, date, time, location, status } = req.body;
  // const role = req.user.role;

  try {
    const event = new Event({
      name,
      description,
      date,
      time,
      location,
      userId: req.user.id,
      status : status || "pending",
      organizer: req.user.id, 
    });
    await event.save();

    res.status(201).json({message: "Event Created Successfully", event})
  } catch (error) {
    console.log(error);
    res.json({ message: "Error creating event", error: error });
  }
}; 

exports.getEditEvent = async (req, res) => {

  try {
    const event = await Event.findById(req.params.id);
    res.json({ title: "Edit Event", event: event  });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error retrieving event" });
  }

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
  try {
    const event = await Event.findById(req.params.id);
    res.json({ title: "Delete Event", event: event });
  }
  catch(err){
    console.log(err);
    res.status(500).json({ message: "Error retrieving event" });
  }
};

exports.postDeleteEvent = async (req, res) => {
  try{
      const event = await Event.findById(req.params.id);
      if (!event) {
          return res.status(404).json({ message: "Event not found" });
      }
      // console.log(event);
      await Event.deleteOne(event);
    

      res.json({ message: "Event deleted successfully" });
  }
  catch(err){
      console.log(err);
      res.status(400).json({ message: "Error deleting event" });
  }
};

// change event status
exports.postChangeStatus = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    event.status = req.body.status;
    event.statusReason = req.body.statusReason;
    await event.save();

    // get the organizer email from the event reference user
    const organizerEmail = await User.findById(event.organizer).select('email');

    if(event.status === 'approved'){
      // send email to all attendees
     const subjectAttendee = "Event Status Update"
     const messageAttendee = `
     You have been registered for the event ${event.name} on ${event.date} at ${event.time} at ${event.location}.

     Regards,
      Event Manager

     
     `
     const attendees = await Attendee.find({ event: event.id }).select('-event');
     attendees.forEach(attendee => {
       sendEmail(attendee.email, subjectAttendee , messageAttendee)
     })
    }

   

    // semd email to organizer
    const subject = "Event Status Update"
    const message = `
    Your event ${event.name} on ${event.date} at ${event.time} at ${event.location} has been ${event.status}.
    ${event.statusReason ? `Reason: ${event.statusReason}` : ''}


    Regards,

    Event Manager

    `
    await sendEmail({
      email: organizerEmail,
      subject,
      message
    })
    // sendEmail(req.user.email, event.name, event.status)

     

    res.json({ message: "Status updated successfully", event });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating status" });
  }
};

// exports.patchEventStatus = async (req, res) => {
//   try {
//     const event = await Event.findById(req.params.id);
//     event.status = req.body.status;
//     await event.save();
//     res.json({ message: "Status updated successfully", event });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Error updating status" });
//   }
// }