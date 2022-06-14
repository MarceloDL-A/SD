function InvalidTokenException(token) {
  this.message = "Invalid Token: " + token;
  this.stack = Error().stack;
}

InvalidTokenException.prototype = Object.create(Error.prototype);
InvalidTokenException.prototype.contructor = InvalidTokenException;
InvalidTokenException.prototype.name = "InvalidTokenException";
