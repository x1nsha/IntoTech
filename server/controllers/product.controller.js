const Product = require("../model/product.model");
const userModel = require("../model/user.model");

const getProductsHandler = async (req, res) => {
  try {
    const allowed = [
      "keyboards",
      "mice",
      "headphones",
      "monitors",
      "speakers",
      "monitor mount",
      "microphones",
      "routers",
    ];
    const products = await Product.find({ category: { $in: allowed } });
    res.json({ data: products });
  } catch (error) {
    console.error("Can't get products", error);
    res.status(500).json({ message: "Server error" });
  }
};

const postProductHandler = async (req, res) => {
  try {
    const { name, description, price, image, category } = req.body;

    if (!name || !description || !price || !image || !category)
      return res.status(400).json({ message: "All fields are required" });

    const allowed = [
      "keyboards",
      "mice",
      "headphones",
      "monitors",
      "speakers",
      "monitor mount",
      "microphones",
      "routers",
    ];
    if (!allowed.includes(category)) {
      return res.status(400).json({ message: "Invalid category" });
    }

    const product = await Product.create({ name, description, price, image, category, createdBy: req.user.userId });
    res
      .status(201)
      .json({ message: "Product created successfully", data: product });
  } catch (error) {
    console.error("Can't post product", error);
    res.status(500).json({ message: "Server error" });
  }
};

const patchProductHandler = async (req, res) => {
  try {
    const { name, description, price, image, category } = req.body;

    if (!name || !description || !price || !image || !category)
      return res.status(400).json({ message: "All fields are required" });

    const allowed = [
      "keyboards",
      "mice",
      "headphones",
      "monitors",
      "speakers",
      "monitor mount",
      "microphones",
      "routers",
    ];
    if (!allowed.includes(category)) {
      return res.status(400).json({ message: "Invalid category" });
    }

    const existing = await Product.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: "Product not found" });

    const currentUser = await userModel.findById(req.user.userId);
    const isOwner = existing.createdBy?.toString() === req.user.userId;
    const isAdmin = currentUser && ["admin", "super_admin"].includes(currentUser.role);
    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, image, category },
      { new: true }
    );
    res.json({ message: "Product updated successfully", data: product });
  } catch (error) {
    console.error("Can't patch product", error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteProductHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await Product.findById(id);
    if (!existing) return res.status(404).json({ message: "Product not found" });

    const currentUser = await userModel.findById(req.user.userId);
    const isOwner = existing.createdBy?.toString() === req.user.userId;
    const isAdmin = currentUser && ["admin", "super_admin"].includes(currentUser.role);
    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const product = await Product.findByIdAndDelete(id);
    res.json({ message: "Product deleted successfully", data: product });
  } catch (error) {
    console.error("Can't delete product", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getProductByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    const allowed = [
      "keyboards",
      "mice",
      "headphones",
      "monitors",
      "speakers",
      "monitor mount",
      "microphones",
      "routers",
    ];
    if (!allowed.includes(product.category)) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ data: product });
  } catch (error) {
    console.error("Can't get product by id", error);
    res.status(500).json({ message: "Server error" });
  }
};

const sortProductsHandler = async (req, res) => {
  try {
    const { sortBy } = req.query;

    let sortQuery = {};
    switch(sortBy){
      case "latest":
        sortQuery = { createdAt: -1 };
        break;
      case "price-low-to-high":
        sortQuery = { price: 1 };
        break;
      case "price-high-to-low":
        sortQuery = { price: -1 };
        break;
      case "name-a-to-z":
        sortQuery = { name: 1 };
        break;
      case "name-z-to-a":
        sortQuery = { name: -1 };
        break;
      default:
        sortQuery = { createdAt: -1 };
    }

    const allowed = [
      "keyboards",
      "mice",
      "headphones",
      "monitors",
      "speakers",
      "monitor mount",
      "microphones",
      "routers",
    ];
    const products = await Product.find({ category: { $in: allowed } }).sort(sortQuery);
    res.status(200).json({ data: products });
  } catch (error) {
    console.error("Can't sort products", error);
    res.status(500).json({ message: "Server error" });
  }
}

const searchProductsHandler = async (req, res) => {
  try {
    const { search, categories } = req.query;

    const allowed = [
      "keyboards",
      "mice",
      "headphones",
      "monitors",
      "speakers",
      "monitor mount",
      "microphones",
      "routers",
    ];
    let query = { name: { $regex: search, $options: "i" }, category: { $in: allowed } };

    if (categories) {
      const categoryArray = categories.split(',').filter(cat => cat.trim());
      if (categoryArray.length > 0) {
        query.category = { $in: categoryArray.filter(c => allowed.includes(c)) };
      }
    }
    
    const product = await Product.find(query);
    res.status(200).json({ data: product });
  } catch (error) {
    console.error("Can't search products", error);
    res.status(500).json({ message: "Server error" });
  }
}

const purgeProductsHandler = async (req, res) => {
  try {
    const { category } = req.query;

    const defaultToPurge = ["watches", "clocks"];

    let categoriesToPurge = defaultToPurge;
    if (category) {
      categoriesToPurge = String(category)
        .split(",")
        .map((c) => c.trim().toLowerCase())
        .filter(Boolean);
    }

    const allowedToPurge = ["watches", "clocks"];
    const finalCategories = categoriesToPurge.filter((c) => allowedToPurge.includes(c));

    if (finalCategories.length === 0) {
      return res.status(400).json({ message: "No valid categories to purge" });
    }

    const result = await Product.deleteMany({ category: { $in: finalCategories } });

    res.status(200).json({
      message: "Purge completed",
      deletedCount: result?.deletedCount || 0,
      categories: finalCategories,
    });
  } catch (error) {
    console.error("Can't purge products", error);
    res.status(500).json({ message: "Server error" });
  }
}

const getMyProductsHandler = async (req, res) => {
  try {
    const { sortBy } = req.query;
    let sortQuery = {};
    switch (sortBy) {
      case "latest":
        sortQuery = { createdAt: -1 };
        break;
      case "price-low-to-high":
        sortQuery = { price: 1 };
        break;
      case "price-high-to-low":
        sortQuery = { price: -1 };
        break;
      case "name-a-to-z":
        sortQuery = { name: 1 };
        break;
      case "name-z-to-a":
        sortQuery = { name: -1 };
        break;
      default:
        sortQuery = { createdAt: -1 };
    }

    const allowed = [
      "keyboards",
      "mice",
      "headphones",
      "monitors",
      "speakers",
      "monitor mount",
      "microphones",
      "routers",
    ];
    const products = await Product.find({
      createdBy: req.user.userId,
      category: { $in: allowed },
    }).sort(sortQuery);
    res.status(200).json({ data: products });
  } catch (error) {
    console.error("Can't get my products", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getProductsHandler,
  postProductHandler,
  patchProductHandler,
  deleteProductHandler,
  getProductByIdHandler,
  sortProductsHandler,
  searchProductsHandler,
  purgeProductsHandler,
  getMyProductsHandler,
};