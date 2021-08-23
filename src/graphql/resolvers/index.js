const authResolver = require('./auth/auth');
const eventsResolver = require('./event/events');
const bookingResolver = require('./booking/booking');

const rootResolver = {
  ...authResolver,
  ...eventsResolver,
  ...bookingResolver,
};

module.exports = rootResolver;
