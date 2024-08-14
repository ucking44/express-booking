const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 7500;

app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }))

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ecommerce'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL database as id ' + db.threadId);
});

// Define Routes

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Create Category
app.post('/categories', (req, res) => {
    const { name, description, image_url } = req.body;
    const sql = 'INSERT INTO categories (name, description, image_url) VALUES (?, ?, ?)';
    db.query(sql, [name, description, image_url], (err, result) => {
      if (err) {
        res.status(500).send('Error creating category');
        return;
      }
      res.status(201).send('Category created successfully');
    });
  });
  
  // Get All Categories
  app.get('/categories', (req, res) => {
    db.query('SELECT * FROM categories', (err, results) => {
      if (err) {
        res.status(500).send('Error retrieving categories');
        return;
      }
      res.json(results);
    });
  });
  
  // Update Category
  app.put('/categories/:id', (req, res) => {
    const categoryId = req.params.id;
    const { name, description, image_url } = req.body;
    const sql = 'UPDATE categories SET name=?, description=?, image_url=? WHERE id=?';
    db.query(sql, [name, description, image_url, categoryId], (err, result) => {
      if (err) {
        res.status(500).send('Error updating category');
        return;
      }
      res.status(200).send('Category updated successfully');
    });
  });
  
  // Delete Category
  app.delete('/categories/:id', (req, res) => {
    const categoryId = req.params.id;
    const sql = 'DELETE FROM categories WHERE id=?';
    db.query(sql, [categoryId], (err, result) => {
      if (err) {
        res.status(500).send('Error deleting category');
        return;
      }
      res.status(200).send('Category deleted successfully');
    });
  });


  // Create Product
app.post('/products', (req, res) => {
    const { name, description, price, stock, category_id, image_url, discount_price } = req.body;
    const sql = 'INSERT INTO products (name, description, price, stock, category_id, image_url, discount_price) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [name, description, price, stock, category_id, image_url, discount_price], (err, result) => {
      if (err) {
        res.status(500).send('Error creating product');
        return;
      }
      res.status(201).send('Product created successfully');
    });
  });
  
  // Get All Products
  app.get('/products', (req, res) => {
    db.query('SELECT * FROM products', (err, results) => {
      if (err) {
        res.status(500).send('Error retrieving products');
        return;
      }
      res.json(results);
    });
  });
  
  // Get Products by Category
  app.get('/products', (req, res) => {
    const categoryId = req.query.category_id; // Retrieve category_id from query params
    let sql = 'SELECT * FROM products';
  
    // If category_id is provided, filter products by category
    if (categoryId) {
      sql += ' WHERE category_id = ?';
      db.query(sql, [categoryId], (err, results) => {
        if (err) {
          res.status(500).send('Error retrieving products by category');
          return;
        }
        res.json(results);
      });
    } else {
      db.query(sql, (err, results) => {
        if (err) {
          res.status(500).send('Error retrieving products');
          return;
        }
        res.json(results);
      });
    }
  });
  
  // Update Product
  app.put('/products/:id', (req, res) => {
    const productId = req.params.id;
    const { name, description, price, stock, category_id, image_url, discount_price } = req.body;
    const sql = 'UPDATE products SET name=?, description=?, price=?, stock=?, category_id=?, image_url=?, discount_price=? WHERE id=?';
    db.query(sql, [name, description, price, stock, category_id, image_url, discount_price, productId], (err, result) => {
      if (err) {
        res.status(500).send('Error updating product');
        return;
      }
      res.status(200).send('Product updated successfully');
    });
  });
  
  // Delete Product
  app.delete('/products/:id', (req, res) => {
    const productId = req.params.id;
    const sql = 'DELETE FROM products WHERE id=?';
    db.query(sql, [productId], (err, result) => {
      if (err) {
        res.status(500).send('Error deleting product');
        return;
      }
      res.status(200).send('Product deleted successfully');
    });
  });

  // Add Product to Cart
app.post('/cart/add', (req, res) => {
    const { user_id, product_id, quantity } = req.body;
    const sql = 'INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)';
    db.query(sql, [user_id, product_id, quantity], (err, result) => {
      if (err) {
        res.status(500).send('Error adding product to cart');
        return;
      }
      res.status(201).send('Product added to cart successfully');
    });
  });
  
  // Get Cart Products by User ID
  app.get('/cart/:user_id', (req, res) => {
    const userId = req.params.user_id;
    const sql = 'SELECT cart.*, products.name, products.price FROM cart INNER JOIN products ON cart.product_id = products.id WHERE cart.user_id = ?';
    db.query(sql, [userId], (err, results) => {
      if (err) {
        res.status(500).send('Error retrieving cart products');
        return;
      }
      res.json(results);
    });
  });
  
  // Update Cart Item
  app.put('/cart/:id', (req, res) => {
    const cartItemId = req.params.id;
    const { quantity } = req.body;
    const sql = 'UPDATE cart SET quantity=? WHERE id=?';
    db.query(sql, [quantity, cartItemId], (err, result) => {
      if (err) {
        res.status(500).send('Error updating cart item');
        return;
      }
      res.status(200).send('Cart item updated successfully');
    });
  });
  
  // Delete Cart Item
  app.delete('/cart/:id', (req, res) => {
    const cartItemId = req.params.id;
    const sql = 'DELETE FROM cart WHERE id=?';
    db.query(sql, [cartItemId], (err, result) => {
      if (err) {
        res.status(500).send('Error deleting cart item');
        return;
      }
      res.status(200).send('Cart item deleted successfully');
    });
  });

