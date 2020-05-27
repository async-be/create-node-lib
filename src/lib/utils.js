const isFunction = predicate =>
  Object.prototype.toString.call(predicate) === "[object Function]";

module.exports = {
  isFunction,
};
