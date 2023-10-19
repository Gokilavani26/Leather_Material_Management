const Product = require("../models/finished");

const getAllProduct = async (req, res) => {
  try {
    const product = await Product.find({});

    res.status(200).json({ product: product });
  } catch (e) {
    res.status(400).json({
      error: e,
    });
  }
};

const createProduct = async (req, res) => {
  const productName = req.body.productName;

  const productCategory = req.body.productCategory;

  const productPrice = req.body.productPrice;
  const productQuantity = req.body.productQuantity;

  try {
    const product = await Product.create({
      productName,
      productCategory,
      productPrice,
      productQuantity,
    });

    return res.status(201).json({
      product: product,
    });
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
};

const updateProduct = async (req, res) => {
  const _id = req.params.id;
  const productName = req.body.productName;
  const productCategory = req.body.productCategory;

  const productPrice = req.body.productPrice;
  const productQuantity = req.body.productQuantity;

  try {
    const product = await Product.findOneAndUpdate(
      { _id },
      {
        productName,
        productCategory,
        productPrice,
        productQuantity,
      }
    );

    return res.status(201).json({
      product: product,
      message: "Updated Successfully",
    });
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
};

const getProductById = async (req, res) => {
  const _id = req.params.id;
  try {
    const product = await Product.findById(_id);

    res.status(200).json({
      prod: product,
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};

const getProductByCategory = async (req, res) => {
  const productName = req.params.productCategory;

  try {
    const finishedProducts = await Product.find({ productName });

    if (categoryProducts.length <= 0) {
      throw Error;
    }
    res.status(200).json({ product: finishedProducts });
  } catch (error) {
    res.status(400).json({ err: error });
  }
};

const deleteProductById = async (req, res) => {
  const _id = req.params.id;
  try {
    const product = await Product.findByIdAndDelete(_id);

    res.status(201).json({
      prod: product,
      message: "deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
};

module.exports = {
  createProduct,
  getAllProduct,
  getProductByCategory,
  deleteProductById,
  getProductById,
  updateProduct,
};
