export class NotFoundError extends Error {
  constructor(message = "Resource not found") {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = 404;
  }
}

export class UnauthorizedError extends Error {
  constructor(message = "Unauthorized") {
    super(message);
    this.name = "UnauthorizedError";
    this.statusCode = 401;
  }
}
export class InvalidtokenError extends Error {
  constructor(message = "Invalid token") {
    super(message);
    this.name = "InvalidtokenError";
    this.statusCode = 403;
  }
}
export class ConflictError extends Error {
  constructor(message = "Conflict") {
    super(message);
    this.name = "ConflictError";
    this.statusCode = 409;
  }
}
export class uniprocessableEntityError extends Error {
  constructor(message = "Unprocessable Entity") {
    super(message);
    this.name = "uniprocessableEntityError";
    this.statusCode = 422;
  }
}

export class BadRequestError extends Error {
  constructor(message = "Bad request") {
    super(message);
    this.name = "BadRequestError";
    this.statusCode = 400;
  }
}
