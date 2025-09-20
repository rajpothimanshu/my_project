const mongoose = require("mongoose");
const { seats, slots } = require("../front-end/src/data")

const TicketSchema = new mongoose.Schema({
  movieName: { type: String },
  slots: { type: String },
  seats: {
    A1: { type: Number },
    A2: { type: Number },
    A3: { type: Number },
    A4: { type: Number },
    D1: { type: Number },
    D2: { type: Number }
  }
});

module.exports = mongoose.model("Ticket", TicketSchema);
module.exports = TicketSchema;




