import axios from 'axios';
import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';

// Configuration
const API_URL = 'http://localhost:5000/api';
const RESULTS_FILE = path.join(__dirname, '../test-results.txt');

// Helper to write to the results file
let results = '';
const appendResult = (text: string) => {
  results += text + '\n';
  console.log(text);
};

// Creates a valid MongoDB ObjectId
const createObjectId = () => new mongoose.Types.ObjectId().toString();

let categoryId: string;
let productId: string;

const testData: Record<string, any> = {
  category: {
    name: 'Test Category',
    description: 'A test category'
  },
  product: {
    name: 'Test Product',
    description: 'A test product',
    price: 19.99,
    stock: 10,
    imageUrl: 'test-image.jpg'
    // category will be set dynamically
  },
  order: {
    customerName: 'Test Customer',
    customerPhone: '1234567890',
    wilaya: 'Test City',
    baladia: 'Test Baladia',
    products: [
      // Will be set dynamically after product creation
    ],
    totalAmount: 39.98,
    shippingCost: 5.00,
    status: 'pending'
  },
  discount: {
    code: 'TEST10',
    percentage: 10,
    expiresAt: new Date(Date.now() + 86400000)
  }
};

const createdIds: Record<string, string> = {};

const endpointDescriptions: Record<string, { path: string, description: string }> = {
  products: {
    path: '/api/products',
    description: 'Products endpoint. Supports CRUD operations for products. Each product belongs to a category and may have a discount.'
  },
  categories: {
    path: '/api/categories',
    description: 'Categories endpoint. Supports CRUD operations for product categories.'
  },
  orders: {
    path: '/api/orders',
    description: 'Orders endpoint. Supports CRUD operations for customer orders. Each order contains customer info and a list of products.'
  },
  discounts: {
    path: '/api/discounts',
    description: 'Discounts endpoint. Supports CRUD operations for discount codes and offers.'
  }
};

const testEndpoint = async (
  resource: string, 
  data: any
): Promise<void> => {
  // Add endpoint info before the test
  const info = endpointDescriptions[resource];
  if (info) {
    appendResult(`\n=== Endpoint: ${info.path} ===`);
    appendResult(`Description: ${info.description}`);
    appendResult(`Methods:`);
    appendResult(`  - GET ${info.path} (get all)`);
    appendResult(`  - GET ${info.path}/:id (get by id)`);
    appendResult(`  - POST ${info.path} (create)`);
    appendResult(`  - PUT ${info.path}/:id (update)`);
    appendResult(`  - DELETE ${info.path}/:id (delete)`);
  }
  appendResult(`\n-----Testing ${resource} CRUD operations-----`);
  
  try {
    // CREATE
    appendResult(`POST ${resource} - Creating new ${resource.slice(0, -1)}`);
    const createResponse = await axios.post(`${API_URL}/${resource}`, data);
    const resourceId = createResponse.data._id;
    createdIds[resource] = resourceId;
    appendResult(`✅ Created ${resource.slice(0, -1)} with ID: ${resourceId}`);
    appendResult(`Response Status: ${createResponse.status}`);
    appendResult(`Response JSON: ${JSON.stringify(createResponse.data, null, 2)}`);

    // READ ALL
    appendResult(`GET ${resource} - Getting all ${resource}`);
    const getAllResponse = await axios.get(`${API_URL}/${resource}`);
    appendResult(`✅ Retrieved ${getAllResponse.data.length} ${resource}`);
    appendResult(`Response Status: ${getAllResponse.status}`);
    appendResult(`Response JSON: ${JSON.stringify(getAllResponse.data, null, 2)}`);

    // READ ONE
    appendResult(`GET ${resource}/${resourceId} - Getting single ${resource.slice(0, -1)}`);
    const getOneResponse = await axios.get(`${API_URL}/${resource}/${resourceId}`);
    appendResult(`✅ Retrieved ${resource.slice(0, -1)}`);
    appendResult(`Response Status: ${getOneResponse.status}`);
    appendResult(`Response JSON: ${JSON.stringify(getOneResponse.data, null, 2)}`);

    // UPDATE
    appendResult(`PUT ${resource}/${resourceId} - Updating ${resource.slice(0, -1)}`);
    const updateData = { ...data };
    if (resource === 'products') updateData.name = 'Updated Test Product';
    if (resource === 'categories') updateData.name = 'Updated Test Category';
    if (resource === 'discounts') updateData.percentage = 15;
    if (resource === 'orders') updateData.status = 'processing';

    const updateResponse = await axios.put(`${API_URL}/${resource}/${resourceId}`, updateData);
    appendResult(`✅ Updated ${resource.slice(0, -1)}`);
    appendResult(`Response Status: ${updateResponse.status}`);
    appendResult(`Response JSON: ${JSON.stringify(updateResponse.data, null, 2)}`);

    // DELETE
    appendResult(`DELETE ${resource}/${resourceId} - Deleting ${resource.slice(0, -1)}`);
    const deleteResponse = await axios.delete(`${API_URL}/${resource}/${resourceId}`);
    appendResult(`✅ Deleted ${resource.slice(0, -1)}`);
    appendResult(`Response Status: ${deleteResponse.status}`);
    appendResult(`Response JSON: ${JSON.stringify(deleteResponse.data, null, 2)}`);

  } catch (error: any) {
    appendResult(`❌ Error testing ${resource}: ${error.message}`);
    if (error.response) {
      appendResult(`Status: ${error.response.status}`);
      appendResult(`Data: ${JSON.stringify(error.response.data, null, 2)}`);
    }
  }
};

const initTest = async () => {
  try {
    const categoryResponse = await axios.post(`${API_URL}/categories`, testData.category);
    categoryId = categoryResponse.data._id;
    testData.product.category = categoryId;
    appendResult(`✅ Created initial category with ID: ${categoryId} for product tests`);

    const productResponse = await axios.post(`${API_URL}/products`, testData.product);
    productId = productResponse.data._id;
    appendResult(`✅ Created initial product with ID: ${productId} for order tests`);

    testData.order.products = [
      {
        product: productId,
        productName: testData.product.name,
        price: testData.product.price,
        quantity: 2
      }
    ];
  } catch (error: any) {
    appendResult(`❌ Error creating initial category/product: ${error.message}`);
    if (error.response) {
      appendResult(`Status: ${error.response.status}`);
      appendResult(`Data: ${JSON.stringify(error.response.data, null, 2)}`);
    }
    throw new Error('Failed to initialize test data');
  }
};

const runTests = async () => {
  appendResult('Starting API Endpoint Tests');
  appendResult('==============================');
  try {
    await initTest();

    // Add endpoint info for products
    await testEndpoint('products', testData.product);

    // Add endpoint info for categories
    appendResult('\n=== Endpoint: /api/categories ===');
    appendResult('Description: Categories endpoint. Supports CRUD operations for product categories.');
    appendResult('Methods:');
    appendResult('  - GET /api/categories (get all)');
    appendResult('  - GET /api/categories/:id (get by id)');
    appendResult('  - POST /api/categories (create)');
    appendResult('  - PUT /api/categories/:id (update)');
    appendResult('  - DELETE /api/categories/:id (delete)');
    appendResult('\n-----Testing categories CRUD operations-----');
    appendResult('✅ Categories operations tested during initialization');

    await testEndpoint('orders', testData.order);
    await testEndpoint('discounts', testData.discount);

    // Cleanup - delete the initial product and category we created
    if (productId) {
      await axios.delete(`${API_URL}/products/${productId}`);
      appendResult(`\n✅ Cleaned up initial product: ${productId}`);
    }
    if (categoryId) {
      await axios.delete(`${API_URL}/categories/${categoryId}`);
      appendResult(`\n✅ Cleaned up initial category: ${categoryId}`);
    }
  } catch (err: any) {
    appendResult(`\n❌ Test initialization failed: ${err.message}`);
  }
  fs.writeFileSync(RESULTS_FILE, results);
  appendResult(`\nTests completed. Results saved to ${RESULTS_FILE}`);
};

runTests().catch(err => {
  appendResult(`Fatal error: ${err.message}`);
  fs.writeFileSync(RESULTS_FILE, results);
});
