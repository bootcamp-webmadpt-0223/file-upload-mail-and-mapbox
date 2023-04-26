const { Schema, model } = require("mongoose");

const bookSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  author: {
    name: String,
    lastName: String,
    nationality: String,
    pictureUrl: String
  },
  rating: {
    type: Number,
    min: 0,
    max: 10
  },
  // GeoJSON: https://www.mongodb.com/docs/manual/reference/geojson/
  location: {
    type: {
      type: String // Point, Line, Polygon...
    },
    coordinates: [Number] // Lng [-180 to 180]  - Lat [-90 to 90]
  }
});

const Book = model("Book", bookSchema);

module.exports = Book;
