const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema(
  {
    // requires the trip name and removes extra spaces
    name: {
      type: String,
      required: [true, 'Trip name is required'],
      trim: true,
      minlength: [3, 'Trip name must be at least 3 characters']
    },

    // requires an image file name and removes extra spaces
    img: {
      type: String,
      required: [true, 'Trip image is required'],
      trim: true
    },

    // requires at least one description item
    description: {
      type: [String],
      required: [true, 'Trip description is required'],
      validate: {
        validator: function(value) {
          return value.length > 0;
        },
        message: 'Trip description must include at least one item'
      }
    }
  },
  {
    timestamps: true
  }
);

mongoose.model('Trip', tripSchema);
