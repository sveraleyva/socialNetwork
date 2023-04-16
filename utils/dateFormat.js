const { ObjectId } = require("mongoose").Types;

// This function formats the data returned by Mongoose to remove the _id field and replace it with id
function formatData(doc) {
  if (doc === null || doc === undefined) {
    return doc;
  }

  const formattedDoc = doc.toObject();
  formattedDoc.id = formattedDoc._id.toString();
  delete formattedDoc._id;

  return formattedDoc;
}

// This function validates that the given ID is a valid MongoDB ObjectId
function isValidObjectId(id) {
  return ObjectId.isValid(id);
}

module.exports = {
  formatData,
  isValidObjectId,
};
