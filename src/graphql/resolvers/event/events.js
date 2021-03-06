const Event = require('../../../models/event');
const User = require('../../../models/user');
const { transformedEvent } = require('../merge');

module.exports = {
  events: async () => {
    try {
      const events = await Event.find();
      return events.map((event) => {
        return transformedEvent(event);
      });
    } catch (err) {
      console.log(err);
    }
  },

  createEvent: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('unauthenticated');
    }
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: new Date(args.eventInput.date),
      creator: req.userId,
    });

    let createdEvent;

    try {
      const result = await event.save();

      createdEvent = transformedEvent(result);

      const creator = await User.findById(req.userId);

      if (!creator) {
        throw new Error('User not found exists');
      }
      creator.createdEvents.push(event);
      await creator.save();
      return createdEvent;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};
