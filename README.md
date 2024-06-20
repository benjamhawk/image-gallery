# Image Gallery Application

Welcome to the Image Gallery Application repo.
This project consists of both a backend and a frontend application to manage and display an image gallery.
[See the live demo here](https://diamond-image-gallery.netlify.app/)

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)

## Introduction

The Image Gallery Application is a web-based platform that allows users to upload, manage, and view images in a gallery format.

## Features

- Upload images
- View images in a grid layout
- Select an image to view in a larger and high-resolution format
- User login - Current implementation does not include authentication. A user simply logs in with an email address.

## Technologies

### Backend

- Node
- Express
- TypeScript
- Prisma
- Tembo for a hosted postrgres database

### Frontend

- React.js
- Axios (for API requests)
- CSS Grid for layout
- Uploadcare for image uploading

## Getting Started

To get a local copy of the project up and running, follow these steps.

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/benjamhawk/image-gallery.git
   cd image-gallery-app
   ```

2. Install dependencies for both backend and frontend:
   ```sh
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

## Backend Setup

1. Create a `.env` file in the `backend` directory with the following environment variables:

   ```env
   DATABASE_URL=postgres://[username]:[password]@[host]:[port]/[database]
   ```

2. Start the backend server:
   ```sh
   cd backend
   npm run dev
   ```

## Frontend Setup

1. Create a `.env.local` file in the `frontend` directory with the following environment variables:

   ```env
   VITE_API_HOST=http://localhost:3000
   VITE_UPLOADCARE_PUBLIC_KEY=d8b139264282b18b0844
   ```

2. Start the frontend development server:
   ```sh
   cd frontend
   npm run dev
   ```
