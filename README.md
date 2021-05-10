
## Notes
Unfortunately, I didn’t have as much time as I wanted to work on this project. So the master branch will be left open, and work will continue on a separate branch (“dev"). You can find the 1.0 release of the project [here](https://github.com/Yzma/Shopify-Backend-Internship-Challenge/releases/tag/v1.0). I will try to post consistent downloads when I have more updates for the project. Thanks!

## Unimplemented Ideas

1. I was not able to finish implementing the ability to purchases images, so some code and buttons on the frontend are still left in such as the manage balance button.
2. Images can be marked as private but there is currently no way to do it on the frontend. You have to match a PATCH request to `/api/v1/users/[userID]/images/[imageID]` and set the private variable to true.

## About

The main purpose of this project is an image repository. A place for users to upload/view and delete images with a frontend and backend created with NextJS.


From the shopify development document, this project currently implements the following: 
- ADD image(s) to the repository
  - one / bulk / enormous amount of images
  - private or public (permissions)
  - secure uploading and stored images

- DELETE image(s)
  - one / bulk / selected / all images
  - Prevent a user deleting images from another user (access control)
  - secure deletion of images

This was made for Shopifys 2021 Backend Internship challenge. 

## Getting Started

Prerequisites:

1. Latest version of NodeJS
2. PostgreSQL server
3. Google or Github auth key
- You can find more information here:
  - https://next-auth.js.org/providers/github
  - https://next-auth.js.org/providers/google

1. Download or clone the project (git clone git@github.com:Yzma/Shopify-Backend-Internship-Challenge.git)
2. Start a terminal inside of the project directory and run ‘npm install’ and wait for the command to complete
3. Create an environment file (‘.env’) inside the project directory
4. Set the following variables:

```bash
NEXTAUTH_URL=http://localhost:3000/

GOOGLE_CLIENT_ID=[Google Client ID]
GOOGLE_CLIENT_ID_SECRET=[Google Client Sercret]

GITHUB_CLIENT_ID=[Github Client ID]
GITHUB_CLIENT_ID_SECRET=[Github Client Sercret]

DATABASE_URL=[PostgreSQL URL]
```

5. Run the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to.

## How to use
Once the project is up and running, type “http://localhost:3000” into your browsers URL.
Click the “Sign in” button located at the top right of the page and sign in with Google or Github
Type in “http://localhost:3000/images” to go to the main page

Now that we're on the main dashboard, let’s go over the various pages we can interact with.

### Components

#### Sidebar:
- Home - Main home index page
- Search Images - The main image repository page to view all public images in the database
- Manage balance - Allows you to manage your account balance to purchase images

#### Header: 
Clicking on your profile picture at the top right allows you to go to your profile page and log out.

### Public Images page (`/images`)
Public images view page. This page shows all the public images in the database to the user. Try uploading some images to on your profile and you will see them here.

### Profile page (`/[userID]`)
To go to your profile, click your profile picture at the top right and click “Your Profile”. Or type (http://localhost:3000/users/1)
Once on your profile, go to the "My Images" tab and click "Upload Images". From here you can upload up to 12 files at a time.

## Main Technologies Used:

1. [NextJS](https://nextjs.org/) - Backend and Frontend
2. [PostgreSQL](https://www.postgresql.org/) (with [Prisma](https://www.prisma.io/)) - Backend
3. [Bootstrap](https://react-bootstrap.github.io/)/[React](https://reactjs.org/) (front-end) - Frontend

## Testing

TODO: Write about tests
