import { NextFunction, Request, Response } from "express";
import { emailRegex } from "../config";

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

export const validatePhotoPostRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { url, userID } = req.body;

  // Check if the URL is provided
  if (!url) {
    return res.status(400).send("URL is required");
  }

  // check if user ID is provided
  if (!userID) {
    return res.status(400).send("User ID is required");
  }

  next();
};

export const validatePhotoGetRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userID = req.query.userID;

  // Check if the user ID is provided
  if (!userID) {
    return res.status(400).send("User ID is required");
  }

  next();
};
