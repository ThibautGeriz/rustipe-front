/**
 * Get rids of the missing requestAnimationFrame polyfill warning.
 *
 * @link https://reactjs.org/docs/javascript-environment-requirements.html
 * @copyright 2004-present Facebook. All Rights Reserved.
 */
global.requestAnimationFrame = function (callback) {
  // eslint-disable-next-line @typescript-eslint/no-implied-eval
  setTimeout(callback, 0);
};
