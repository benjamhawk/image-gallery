import { Router } from "express";
import { PrismaClient } from "@prisma/client";

import {
  asyncHandler,
  validateEmail,
  validatePhotoGetRequest,
  validatePhotoPostRequest,
} from "./utils/middleware";

export const router = Router();
export const prisma = new PrismaClient();

/**
 * Route to retrieve a user by email.
 * Creates a new user if one does not already exist with the provided email.
 */
router.post(
  "/user",
  validateEmail,
  asyncHandler(async (req, res) => {
    const email = req.body.email;

    // TODO: Separate the signup and login logic and add authentication.
    // User's auth token should be stored in JWT and added to a HTTP-only cookie.

    const user = await prisma.user.upsert({
      where: { email },
      update: {},
      create: { email },
    });

    return res.status(201).send({ user_id: user.id?.toString() });
  })
);

/**
 * Route to create a new photo.
 */
router.post(
  "/photo",
  validatePhotoPostRequest,
  asyncHandler(async (req, res) => {
    const { url, user_id, description } = req.body;

    const photo = await prisma.photo.create({
      data: {
        url,
        description,
        userId: Number(user_id),
      },
    });

    return res.status(201).send({
      id: photo.id?.toString(),
      description: photo.description,
      user_id: photo.userId?.toString(),
      url: photo.url,
    });
  })
);

/**
 * Route to retrieve photos by user ID.
 */
router.get(
  "/photo",
  validatePhotoGetRequest,
  asyncHandler(async (req, res) => {
    const photos = await prisma.photo.findMany({
      where: {
        userId: Number(req.query.user_id),
      },
    });

    const response = {
      count: photos.length,
      photos: photos.map((photo) => ({
        id: photo.id.toString(),
        url: photo.url,
        description: photo.description,
      })),
    };

    return res.json(response);
  })
);
