import { Router } from "express";
import { prisma } from "./utils/db-client";
import {
  validateEmail,
  validatePhotoGetRequest,
  validatePhotoPostRequest,
} from "./utils/middleware";

export const router = Router();

router.post("/user", validateEmail, async (req, res) => {
  const email = req.body.email;

  await prisma.user.upsert({
    where: { email },
    update: {},
    create: { email },
  });

  return res.status(201).send("User created");
});

router.post("/photo", validatePhotoPostRequest, async (req, res) => {
  const { url, userID, description } = req.body;

  await prisma.photo.create({
    data: {
      url,
      description,
      user: { connect: { email: userID } },
    },
  });

  return res.status(201).send("Photo created");
});

router.get("/photo", validatePhotoGetRequest, async (req, res) => {
  const photos = await prisma.photo.findMany({
    where: {
      userId: Number(req.query.userID),
    },
  });

  const response = {
    count: photos.length,
    photos: photos.map((photo) => ({
      id: photo.id,
      url: photo.url,
      description: photo.description,
    })),
  };

  return res.json(response);
});
