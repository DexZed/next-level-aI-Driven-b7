export class HttpException extends Error {
  public status: number;
  public override message: string;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;

    // Maintain proper prototype chain
    Object.setPrototypeOf(this, HttpException.prototype);
  }
}
export class BadRequestException extends HttpException {
  constructor(message = "Bad Request") {
    super(400, message);
  }
}

export class NotFoundException extends HttpException {
  constructor(message = "Not Found") {
    super(404, message);
  }
}

export class UnauthorizedException extends HttpException {
  constructor(message = "Unauthorized") {
    super(401, message);
  }
}
export class ForbiddenException extends HttpException {
  constructor(message = "Forbidden") {
    super(403, message);
  }
}