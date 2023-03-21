const ROLES = require('../models/User')

function canVeiewEvents(user, event) {

  return( 
    user.role === ROLES.admin || 
    event.userId === user.id
  )
}

function canEditEvents(user, event) {
  return (
    user.role === ROLES.admin || 
    event.userId === user.id
  )
}

function canDeleteEvents(user, event) {
    return event.userId === user.id
}

function canCreateEvents(user, event) {
    return (
        user.role === ROLES.admin ||
        event.userId === user.id
    )
}

function scopedEvents(user, events) {
    if (user.role === ROLES.admin) {
        return events
    }
    return events.filter(event => event.userId === user.id)

}



module.exports = {
    canVeiewEvents,
    canEditEvents,
    canDeleteEvents,
    canCreateEvents,
    scopedEvents
}
