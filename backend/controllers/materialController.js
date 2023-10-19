const Material = require("../models/raw");
const getAllMaterial = async (req, res) => {
  try {
    const material = await Material.find({});

    res.status(200).json({ material: material });
  } catch (e) {
    res.status(400).json({
      error: e,
    });
  }
};

const createMaterial = async (req, res) => {
  const materialName = req.body.materialName;
  const supplierName = req.body.supplierName;
  const materialCost = req.body.materialCost;
  const materialQuantity = req.body.materialQuantity;

  try {
    const material = await Material.create({
      materialName,
      supplierName,
      materialCost,
      materialQuantity,
    });

    return res.status(201).json({
      material: material,
    });
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
};

const updateMaterial = async (req, res) => {
  const _id = req.params.id;
  const materialName = req.body.materialName;
  const supplierName = req.body.supplierName;
  const materialCost = req.body.materialCost;
  const materialQuantity = req.body.materialQuantity;

  try {
    const material = await Material.findOneAndUpdate(
      { _id },
      {
        materialName,
        supplierName,
        materialCost,
        materialQuantity,
      }
    );

    return res.status(201).json({
      material: material,
      message: "Updated Successfully",
    });
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
};

const getMaterialById = async (req, res) => {
  const _id = req.params.id;
  try {
    const material = await Material.findById(_id);

    res.status(200).json({
      material: material,
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};

const getMaterialByCategory = async (req, res) => {
  const materialName = req.params.productCategory;

  try {
    const material = await Material.find({ materialName });

    if (material.length <= 0) {
      throw Error("No material found for the given category");
    }

    res.status(200).json({ material: material });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteMaterialById = async (req, res) => {
  const _id = req.params.id;
  try {
    const material = await Material.findByIdAndDelete(_id);

    res.status(200).json({
      material: material,
      message: "Deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
};

module.exports = {
  createMaterial,
  getAllMaterial,
  getMaterialByCategory,
  deleteMaterialById,
  getMaterialById,
  updateMaterial,
};
