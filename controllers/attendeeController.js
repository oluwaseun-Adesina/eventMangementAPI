const Event = require("../models/Event");
const Attendee = require("../models/Attendee");
const sendEmail = require("../email/email");

// attendees controller

exports.getAllAttendees = async (req, res) => {
  try {
    const attendees = await Attendee.find().sort({ createdAt: -1 });
    res.json({ title: "All Attendees", attendees });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error retrieving attendees" });
  }
}

exports.getSingleAttendee = async (req, res) => {
  try {
    const attendee = await Attendee.findById(req.params.attendeeId);
    console.log(attendee);
    res.json({ attendee: attendee, title: "Attendee Details" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error retrieving attendee" });
  }

}

exports.getCreateAttendee = (req, res) => {
  res.json("Enter the name, email, phone, and event to register a person for an event");
}


exports.postAttendee = async (req, res) => {
  const { name, email, phone, event } = req.body;

  try {
    const attendee = new Attendee({ name, email, phone, event });
    await attendee.save();

    const eventDetails = await Event.findById(event);

    const message = `Hi ${attendee.name}, you have successfully registered for the event. We look forward to seeing you there.
      THE EVENT DETAILS ARE AS FOLLOWS:
      Event Name: ${eventDetails.name}
      Event Date: ${eventDetails.date}
      Event Time: ${eventDetails.time}
      Event Venue: ${eventDetails.location}
      Event Description: ${eventDetails.description}

    Regards,
    TMax Events
    `;
    await sendEmail({
      email: attendee.email,
      subject: "Event Registration Details",
      message,
    });

    await Event.findByIdAndUpdate(
      event,
      { $push: { attendees: attendee._id } },
      { new: true }
    );

    res.json({ message: "Event details sent to attendee email", attendee, event });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ message: "Error creating attendee", error });
  }
};



exports.getEditAttendee = async (req, res) => {
  const attendee = await Attendee.findById(req.params.attendeeId);
  res.json({ attendee: attendee, title: "Edit Attendee" });
}

exports.postEditAttendee = async (req, res) => {
  let attendee = await Attendee.findById(req.params.attendeeId);
  attendee = Object.assign(attendee, req.body);
  try {
    await attendee.save();
    res.status(200).json({message: "Editted attendee",attendee});
  } catch (error) {
    console.log(error);
    res.json({ message: "Error updating attendee", error: error });
  }
}   

exports.getDeleteAttendee = async (req, res) => {
  const attendee = await Attendee.findById(req.params.attendeeId);
  res.json({title: "Delete Attendee", attendee: attendee, });
}


exports.deleteAttendee = async (req, res) => {
  try {

    // RETRIEVE ATTENDEE AND EVENT DETAILS
    const attendee = await Attendee.findById(req.params.attendeeId);
    const eventDetails = await Event.findById(attendee.event);
    // const eventDetails = attendee.event;

    // SEND EMAIL TO ATTENDEE
    const message = `Hi ${attendee.name}, you have successfully unregistered for the event. We hope to see you again.
    THE EVENT DETAILS ARE AS FOLLOWS:
    Event Name: ${eventDetails.name}
    Event Date: ${eventDetails.date}
    Event Time: ${eventDetails.time}
    Event Venue: ${eventDetails.location}
    Event Description: ${eventDetails.description}

    Regards,
    TMax Events
    `;
    await sendEmail({
      email: attendee.email,
      subject: "Event Unregistration Details",
      message,
    });

    // DELETE ATTENDEE
    await Event.findByIdAndUpdate(
      attendee.event,
      { $pull: { attendees: attendee._id } },
      { new: true }
    );

    await Attendee.findByIdAndDelete(req.params.id);

    res.json({ message: "Attendee deleted successfully, mail sent to attendee", attendee });
  } catch (error) {
    console.log(error);
    res.json({ message: "Error deleting attendee", error: error });
  }
}


exports.getEventAttendees = async (req, res) => {


  const id = req.params.eventId;
  const event = await Event.findById(id).select('-name -description -date -location').populate({ path: 'attendees', select: '-event' });
  

  res.json({ title: "Event Attendees", event });

};



exports.getEventsByAttendees = async (req, res) => {
  try {
    const attendeeId = req.params.attendeeId;

  const attendees = await Attendee.findById(attendeeId)
  const events = await Event.find({ _id: { $in: attendees.event } }).select('-attendees');

  res.json(events);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error retrieving events" });
  }

}


// count attendees by event
exports.countAttendeesByEvent = async (req, res) => {
  const eventId = req.params.eventId;

  const event = await Event.findById(eventId).select('-name -description -date -location');
  const attended = await Attendee.find({ event: event._id });
  console.log(event);
  console.log(attended);
  const count = attended.length;
  res.json({ count });
}