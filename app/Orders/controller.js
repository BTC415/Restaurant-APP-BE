const Order = require('./model');

const createOrder = function (req, res, next) {
  const {
    items,
    totalCost
  } = req.body;
  
  const userId = req.user._id;

  const order = new Order({
    userId,
    items,
    totalCost
  });

  order
    .save()
    .then(order => {
      res.json({
        success: true,
        order,
      });
    });
};

const getOrderByUser = function (req, res, next) {
  const {
    userId,
  } = req.query;

  Order
    .find({
      userId,
    })
    .exec()
    .then((orders) => {
      res.json({
        orders
      });
    })
    .catch(e => next(e));
};

module.exports = {
  createOrder,
  getOrderByUser,
};
