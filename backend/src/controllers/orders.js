import { getAllOrders, insertOrder } from '../servises/orders.js';

function validateEmail(value) {
  if (!value) {
    return 'Email is required';
  }

  const emailPattern = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

  if (!emailPattern.test(value)) {
    return 'Email is not valid';
  }
}

function validateName(value) {
  if (!value) {
    return 'Name is required';
  }

  const usernamePattern = /^[a-zA-Z0-9]+$/;

  if (!usernamePattern.test(value)) {
    return 'Name is not valid';
  }
}

function validatePhone(value) {
  if (!value) {
    return 'Phone is required';
  }

  const phonePattern = /^\d{10}$/;

  if (!phonePattern.test(value)) {
    return 'Phone is not valid';
  }
}

export const getAll = async(req, res) => {
  try {
    const orders = await getAllOrders();
    res.send(orders);
  } catch (error) {
    res.status(500).send(`Internal server error: ${error}`);
  }
};

export const setOrder = async(req, res) => {
  try {
    if (!req.body.name) {
      res.statusCode = 400;
      res.send('Bad Request');
  
      return;
    };
  
    const errors = {
      name: validateName(req.body.name),
      email: validateEmail(req.body.email),
      phone: validatePhone(req.body.phone),
    }
  
    if (errors.name || errors.email || errors.phone) {
      res.statusCode = 400;
      res.send(errors);
    } else {
      const order = {
        id: req.body.id,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        order: req.body.order,
        total: req.body.total,
        address: req.body.address,
      };
    
      insertOrder(
        order.id,
        order.name,
        order.email,
        order.phone,
        order.order,
        order.total,
        order.address,
      );
      res.statusCode = 201;
      res.send(order);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};


