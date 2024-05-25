# Blogging API

Welcome to the Blogging API project! This backend platform empowers users to create, manage, and explore blogs effortlessly. With features like user authentication, CRUD operations for blogs, and sophisticated search capabilities, this API provides a seamless experience for both creators and readers.

## Highlights

- **User Authentication**: Seamlessly sign up and sign in to access the platform's features securely.
- **JWT Authentication**: Utilize JWT tokens for authentication, ensuring data security with token expiration set to 1 hour.
- **CRUD Operations**: Enjoy full control over your blogs with operations like create, read, update, and delete.
- **Blog States Management**: Manage your blogs' lifecycle with support for draft and published states.
- **Pagination, Search, and Sorting**: Easily navigate through blogs with pagination, search functionality, and sorting options.
- **Auto-calculated Reading Time**: Get an estimated reading time for each blog to help users plan their reading sessions.
- **Update Read Count**: Track engagement by updating the read count every time a blog is accessed.

## Tech Stack

- **Node.js**: Efficient server-side JavaScript runtime environment.
- **Express.js**: Lightweight and flexible web application framework for Node.js.
- **MongoDB**: Scalable NoSQL database solution for storing blog data.
- **Mongoose**: Elegant MongoDB object modeling for Node.js.
- **JWT**: Secure token-based authentication mechanism.
- **Winston**: Versatile logging library for tracking functions and processes.
<!-- - **Jest/Supertest**: Robust testing framework for unit and integration testing. -->
- **Render**: Hosting and deployment platform for seamless application deployment.

!["ERD diagram showing relationships between models."](ERD.png?raw=true)

## Installation Instructions

Guidelines on how to get a development environment running:

1. **Clone the repository**

```bash
git clone https://github.com/dejosemario/EXAM_BLOGGING-API.git
cd EXAM_BLOGGING-API
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**
   Create a `.env` file in the root directory and fill it with the necessary environment variables:

```bash
DB_URI=mongodb://localhost:27017/blogging
JWT_SECRET=your_jwt_secret
PORT=8000
```

4. **Run the server**

```bash
npm start
```

## API Endpoints

| Methods | Endpoint                 | Protected | Description                                     |
| ------- | ------------------------ | --------- | ----------------------------------------------- |
| POST    | `/api/auth/register`     | No        | Registers a new                                 |
| POST    | `/api/auth/login`        | No        | Logs in a user                                  |
| GET     | `/api/blogs/:id`         | No        | Retrieves a specific blog                       |
| GET     | `/api/blogs`             | No        | Retrieves all published blogs                   |
| POST    | `/api/blogs`             | Yes       | Create a new blog                               |
| PATCH   | `/api/blogs/:id`         | Yes       | Edit a specific blog                            |
| PATCH   | `/api/blogs/:id/publish` | Yes       | Publish a specific blog                         |
| DELETE  | `/api/blogs/:id`         | Yes       | Deletes a specific blog                         |
| GET     | `/api/users/me/blogs`    | Yes       | Retrieves all blogs from the authenticated user |

