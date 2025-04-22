## OmniMart API

An e-commerce REST API built with Express.js, TypeScript, and MongoDB.

### Features

- Full CRUD operations for:
  - Products
  - Categories
  - Orders
  - Discounts
  - Users
  - Store Settings
  - Statistics

### Tech Stack

- Node.js & Express.js
- TypeScript
- MongoDB & Mongoose
- Authentication & Authorization

### Getting Started

1. Clone the repository
2. Install dependencies
   ```
   npm install
   ```
3. Set up environment variables
   - Create a `.env` file in the root directory
   - Add MongoDB connection string:
     ```
     MONGODB_URI=mongodb+srv://admin:admin@ecommerce.rq8hick.mongodb.net/?retryWrites=true&w=majority&appName=Ecommerce
     PORT=5000
     ```

4. Run the development server
   ```
   npm run dev
   ```
   
   Or using nodemon:
   ```
   npm run nodemon
   ```

5. Test the API
   - Base URL: `http://localhost:5000`
   - API routes:
     - Products: `/api/products`
     - Categories: `/api/categories`
     - Orders: `/api/orders`
     - Discounts: `/api/discounts`
     - Users: `/api/users`
     - Statistics: `/api/statistics`
     - Store Settings: `/api/store-settings`

### API Endpoints

#### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get a product by ID
- `POST /api/products` - Create a new product
- `PUT /api/products/:id` - Update a product
- `DELETE /api/products/:id` - Delete a product

#### Similar patterns for other entities
- Categories, Orders, Discounts, Users follow the same RESTful pattern
- Statistics and Store Settings have simplified GET and PUT endpoints

### License

ISC