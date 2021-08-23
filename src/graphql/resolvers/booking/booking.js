const Booking = require('../../../models/booking');
const Event = require('../../../models/event');
const { transformedBooking, transformedEvent } = require('../merge');

module.exports = {
  bookings: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('unauthenticated');
    }
    try {
      const bookings = await Booking.find();
      return bookings.map((booking) => {
        return transformedBooking(booking);
      });
    } catch (err) {
      throw err;
    }
  },

  bookEvent: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('unauthenticated');
    }
    const fetchedEvent = await Event.findOne({ _id: args.eventId });
    const booking = new Booking({
      user: req.userId,
      event: fetchedEvent,
    });
    const result = await booking.save();
    return transformedBooking(result);
  },

  cancelBooking: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('unauthenticated');
    }
    try {
      const booking = await Booking.findById(args.bookingId).populate('event');
      const event = transformedEvent(booking.event);
      await Booking.deleteOne({ _id: args.bookingId });
      return event;
    } catch (err) {
      throw err;
    }
  },
};
