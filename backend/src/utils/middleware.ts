import { NextFunction, Request, Response } from "express";
import { emailRegex } from "../config";

/* 
  Note for review: In a production application the request validation would be more robust and would likely validate types as well.
  A library like Zod could be used to validate the request body.
*/

/**
 * Express Middleware to validate an email address.
 */
export const validateEmail = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const email = req.body.email;

  // Check if the email is provided
  if (!email) {
    return res.status(400).send("Email is required");
  }

  // Check if the email is valid
  if (!email.match(emailRegex)) {
    return res.status(400).send("Email is invalid");
  }

  next();
};

/**
 * Express Middleware to validate a photo Post request.
 */
export const validatePhotoPostRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { url, user_id } = req.body;

  // Check if the URL is provided
  if (!url) {
    return res.status(400).send("URL is required");
  }

  // check if user ID is provided
  if (!user_id) {
    return res.status(400).send("User ID is required");
  }

  next();
};

/**
 * Express Middleware to validate a photo Get request.
 */
export const validatePhotoGetRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Check if the user ID is provided
  if (!req.query.user_id) {
    return res.status(400).send("User ID is required");
  }

  next();
};

/**
 * Wrapper middleware function to allow for easy async route handlers for Express.
 * Any errors are caught and passed to Express for default error handling.
 */
export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => void
): ((req: Request, res: Response, next: NextFunction) => void) => {
  return (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(fn(req, res, next)).catch(next);
  };
};

/**
 * Express Middleware to catch any uncaught errors that occur during the request.
 * Returns a 500 status code and a generic error message back to the client.
 */
export const catchError = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("<ServerError>", error);
  res.status(500).send("An internal error occurred");
};
