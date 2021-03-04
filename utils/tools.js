exports.delay = require('util').promisify(setTimeout);

/**
* Removes one or more specific elements from an array.
* @param {string | number | any[]} items String, number or array of items to remove
* @param {any[]} array The array where to remove items
*/

exports.remove = (items, array) => {
  if (Array.isArray(items)) {
      items.forEach(item => {
          for (let i = 0; i < array.length; i++) {
              if (array[i] == item) {
                  array.splice(i, 1);
              }
          }
      });
  } else {
      for (let i = 0; i < array.length; i++) {
          if (array[i] == items) {
              array.splice(i, 1);
          }
      }
  }
};

/**
* Returns a random value from a specific array, a random character of a specific string, a random number from 0 up to a specific number or a random object property or value.
* @param {any} range The random result to get from a string, number, array or object
*/

exports.random = (range) => {
  let result;

  if (typeof range == 'number') {
      result = Math.floor(Math.random() * (range + 1));
  } else if (Array.isArray(range) || typeof range == 'string') {
      result = range[Math.floor(Math.random() * range.length)];
  } else if (typeof range == 'object') {
      result = Object.entries(range)[Math.floor(Math.random() * Object.entries(range).length)];
  }

  return result;
};