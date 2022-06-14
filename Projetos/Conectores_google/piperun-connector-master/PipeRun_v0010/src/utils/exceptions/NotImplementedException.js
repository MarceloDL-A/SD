function NotImplementedException(funcName) {
  this.message = "Function " + funcName + " not implemented";
  this.stack = Error().stack;
}

NotImplementedException.prototype = Object.create(Error.prototype);
NotImplementedException.prototype.contructor = NotImplementedException;
NotImplementedException.prototype.name = "NotImplementedException";
