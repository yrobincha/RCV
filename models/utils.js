/**
 * Check if numbers are positive integers
 *
 * @param numbers
 * @return {boolean} Return TRUE only if all of the parameters fits
 */
exports.isNaturalNumber = (...numbers) => {
  for (let number of numbers) {
    if (typeof number !== "number" || !Number.isInteger(number) || number < 0)
      return false;
  }
  return true;
};

/**
 * Determine if variables are declared
 *
 * @param variables Rest parameters
 * @return {boolean} Return TRUE only if all of the parameters are set
 */
exports.isset = (...variables) => {
  for (let variable of variables) {
    if (typeof variable === "undefined") return false;
  }
  return true;
};
