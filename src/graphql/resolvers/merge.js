const User = require('../../models/user');
const Event = require('../../models/event');
const { dateToString } = require('../../helpers/date');

const user = async (userId) => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      _id: user.id,
      createdEvents: events.bind(this, user._doc.createdEvents),
    };
  } catch (err) {
    throw err;
  }
};

const transformedEvent = (event) => {
  return {
    ...event._doc,
    _id: event.id,
    date: dateToString(event._doc.date),
    creator: user.bind(this, event.creator),
  };
};

const events = async (eventIds) => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });
    return events.map((event) => {
      return transformedEvent(event);
    });
  } catch (err) {
    throw err;
  }
};

const singleEvent = async (eventId) => {
  try {
    const event = await Event.findById(eventId);
    return transformedEvent(event);
  } catch (err) {
    throw err;
  }
};

const transformedBooking = (booking) => {
  return {
    ...booking._doc,
    _id: booking.id,
    user: user.bind(this, booking._doc.user),
    event: singleEvent.bind(this, booking._doc.event),
    createdAt: dateToString(booking._doc.createdAt),
    updatedAt: dateToString(booking._doc.updatedAt),
  };
};

exports.transformedBooking = transformedBooking;
exports.transformedEvent = transformedEvent;

/**

 * // dont forget to overwrite the id in case of casting while saving it
        //   return { ...event._doc, _id: event._doc._id.toString() };
        //   OR
        //   return { ...event._doc, _id: event.id, creator: {...event._doc.creator._doc, _id: event._doc.creator.id} };
        //   OR

 */
