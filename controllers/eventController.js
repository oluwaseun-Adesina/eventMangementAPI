const Event = require("../models/Event");
const Attendee = require("../models/Attendee");


exports.getAllEvents = async (req, res) => {
  try {
    // const events = await Event.find().sort({ createdAt: -1 });

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

