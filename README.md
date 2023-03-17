# Event Management App

## User Story

 As an event organizer, I want to create and manage events through a web platform. I should be able to:

Register and log in to the platform (I should get a welcome mail when I register).
Create new events with details such as name, date, location, description.
Manage attendees by adding, editing and removing attendees from the event (attendees should get a mail when they are added to or removed from an event).
Generate reports for each event with information about attendee count etc.

## Requirements Analysis

### Entities:

-   Menu: A menu has a list of items, each with a name, description, price, and category.
-   Customers: A customer has a unique identifier, name, email, and password.
-   Orders: An order has a unique identifier, the customer who placed it, a list of items, and the total amount.

### Relationships:

-   A customer can view the menu and place an order.
-   An order can contain multiple items.

## NoSQL Schema Design

Based on the requirements analysis, the following schema can be designed:

### Attendee Collection:

```
{
   _id: ObjectId,
   name: string,
   email: string,
   phone: string,
   event: [
     {
        eventId: ObjectId,
     }
   ]
}

```

### User Collection:

```
{
   _id: ObjectId,
   firstname: string,
    lastname: string,
   email: string,
   password: string,
   address: string,
    phone: string
}

```

### Event Collection:

```
{
   _id: ObjectId,
   name: string,
   description: string,
    date: string,
    time: string,
    location: string,
    organizer: string,
   attendees: [
     {
        eventId: ObjectId,
     }
   ]
}

```
## API Endpoints

### **ATTENDEE ENDPOINTS**

```
-   GET /attendees - Get a list of all attendees.
-   GET /attendee Get create a new attendee.
-   GET /attendee/:{attendeeId} - Get details of a specific attendee.
-   POST /attendee - Create a new attendee.
-   GET /attendee/edit - Get edit details of a specific attendee.
-   PATCH /attendee/edit/:{attendeeId} - Update details of a specific attendee.
-   GET /attendee/delete - Get delete a specific attendee.
-   DELETE /attendee/:{attendeeId} - Delete a specific attendee.
-   GET /attendee/:{attendeeId}/events - Get a list of all events attended by a specific attendee.
-   GET /attendeelist/:{eventId} - Get a list of all attendees attending a specific event.
-   GET /attendee/:{event}/count - Get the number of attendees attending a specific event.
```

### **EVENT ENDPOINTS**

```
-   GET /events - Get a list of all events.
-   GET /event/:{id} - Get details of a specific event.
-   GET /event Get create a new event.
-   POST /event - Create a new event.
-   GET /event/:id - Get edit details of a specific event.
-   PATCH /event/:{Id} - Update details of a specific event.
-   GET /event/delete/:id - Get delete a specific event.
-   DELETE /event/delete/:{id} - Delete a specific event.
```

### **USER ENDPOINTS**

```
-   GET /signup - Get create a new user.
-   POST /signup - Create a new user.
-   GET /login - Get login a user.
-   POST /login - Login a user.
-   GET /logout - Logout a user.

```

### **HOSTED ON**

```
-  Render : https://specialmanbackendassignmentthree.onrender.com

```

## MailTrap

```
-  MailTrap : https://mailtrap.io/inboxes/1390000/messages/224000000
-  MailTrap Email : alessandria3@jaccessedsq.com
-  MailTrap Password : 1234567890


```

## Postman

```
-  Postman : https://documenter.getpostman.com/view/19758246/2s93JxsMcM

```