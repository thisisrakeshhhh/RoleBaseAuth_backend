# RoleBaseAuth_backend

Yeah, so this is a Node.js backend. It does role-based authentication. 

## What it does
- JWT-based auth. Two roles: users and artists.
- Artists can upload music and create albums.
- Users can view music and albums. 
- Uses MongoDB for data and ImageKit for file uploads.
- Standard Express setup. You know the drill.

## Setup
1. Run `npm install`.
2. Set up your `.env` file. You'll need `JWT_SECRET`, ImageKit keys (`IMAGEKIT_PRIVATE_KEY`, etc.), and a MongoDB connection string.
3. Run `npm run dev` to start the server.
