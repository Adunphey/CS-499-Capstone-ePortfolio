const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    img: { type: String, required: true, trim: true },
    description: { type: [String], required: true }
  },
  { timestamps: true }
);

mongoose.model('Trip', tripSchema);
