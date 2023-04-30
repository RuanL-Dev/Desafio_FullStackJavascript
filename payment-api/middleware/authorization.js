const createError = require("http-errors");

const AUTHORIZED_API_KEYS = ["4d72e9fc-6e05-4fd4-a814-62b3e7485b14"];

/**
 * Check if API Key is valid
 * @param {Array} apiKey
 * @returns {Boolean}
 */
function isApiKeyValid(apiKey) {
  return AUTHORIZED_API_KEYS.includes(apiKey);
}

function ensureAuthorized(req, _, next) {
  const apiKey = req.headers["x-api-key"];
  if (!apiKey) {
    return next(createError(401, "No API key provided."));
  }

  if (!isApiKeyValid(apiKey)) {
    return next(
      createError(
        401,
        "Invalid API key. You must require or generate a new one."
      )
    );
  }

  next();
}

module.exports = { ensureAuthorized };
