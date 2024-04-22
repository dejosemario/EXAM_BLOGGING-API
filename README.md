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
