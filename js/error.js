class ApiError extends Error {
  constructor(message, name, status) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}
