const Supplier = require("../models/supplier");

const getAllSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.find({});

    res.status(201).json({
      supplier: supplier,
    });
  } catch (e) {
    res.status(401).json({
      error: e,
    });
  }
};

const getSupplierById = async (req, res) => {
  const _id = req.params.id;

  try {
    const supplier = await Supplier.findOne({ _id });

    res.status(201).json({
      supplier: supplier,
    });
  } catch (error) {
    res.status(400).json({
      e: error,
    });
  }
};

const addSupplier = async (req, res) => {
  const supplierName = req.body.supplierName;
  const supplierphoneNumber = req.body.supplierphoneNumber;
  const supplierCompany = req.body.supplierCompany;
  const supplierPay = req.body.supplierPay;

  try {
    const supplier = await Supplier.create({
      supplierName,
      supplierCompany,
      supplierphoneNumber,
      supplierPay,
    });

    res.status(201).json({
      supplier: supplier,
    });
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
};

const deleteSupplier = async (req, res) => {
  const _id = req.params.id;

  try {
    await Supplier.findByIdAndDelete(_id);

    res.status(201).json({
      message: "deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      e: error,
    });
  }
};

const updateSupplier = async (req, res) => {
  const _id = req.params.id;
  const supplierName = req.body.supplierName;
  const supplierphoneNumber = req.body.supplierphoneNumber;
 
  const supplierCompany = req.body.supplierCompany;
  const supplierPay = req.body.supplierPay;

  try {
    const supplier = await Supplier.findByIdAndUpdate(
      { _id },
      {
        supplierName,
        supplierCompany,
      
        supplierphoneNumber,
        supplierPay,
      }
    );

    res.status(201).json({
      supplier: supplier,
    });
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
};



module.exports = {
  getAllSupplier,
  getSupplierById,
  addSupplier,
  deleteSupplier,
  updateSupplier,
};
