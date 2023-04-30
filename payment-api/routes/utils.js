const allowedChars = "0123456789ABCDEFGHJKLMNPQRSTUVWXYZ";

/**
 * Create a new Payment Id
 * @param {Array} existingIds
 * @returns {String}
 */
function generateId(existingIds = []) {
  let newId = "";

  for (let index = 0; index < 7; index++) {
    newId += allowedChars.charAt(
      Math.floor(Math.random() * allowedChars.length)
    );
  }

  if (existingIds.includes(newId)) {
    return generateId(existingIds);
  }

  existingIds.push(newId);
  return newId;
}

module.exports = { generateId };
