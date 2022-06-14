function InvalidArgumentException(message) {
  this.message = message
    ? "Invalid Argument: " + message
    : "Invalid Argument: Argument provided is not valid";
  this.stack = Error().stack;
}

InvalidArgumentException.prototype = Object.create(Error.prototype);
InvalidArgumentException.prototype.contructor = InvalidArgumentException;
InvalidArgumentException.prototype.name = "InvalidArgumentException";
