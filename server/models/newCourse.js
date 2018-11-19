const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Pass `{algoliaIndex: true}` to push theses attributes for indexing to Algolia
const newIndexSchema = new Schema({
    description: { type: String, required: true, algoliaIndex: true },
    prereqs: { type: String, required: true, algoliaIndex: true },
    lecture: { type: mongoose.Schema.Types.Mixed, required: true, algoliaIndex: true },
    profReview: { type: mongoose.Schema.Types.Mixed, required: true, algoliaIndex: true },
    sections: { type: [{}], required: true, algoliaIndex: true },
    courseTitle: { type: String, required: true, algoliaIndex: true },
    courseID: { type: String, required: true, algoliaIndex: true },
    meta: { type: mongoose.Schema.Types.Mixed, required: true, algoliaIndex: true },
  });

  module.exports = newCourse = mongoose.model("newCourse", newIndexSchema);