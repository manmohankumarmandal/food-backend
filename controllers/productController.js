import product from "../models/productModel.js";
const createProduct = async (req, res) => {
  const { title, image } = req.body;
  console.log(title)
  console.log(image)
  try {
    if (!title || !image) {
      return res.status(401).json({ message: "all field filled are required" });
    }
    const Product = await product.findOne({ title });
    if (Product) {
      return res.json({ message: "Product allready exist" });
    }
    const newProduct =await new product({
      title,

      image,
    });
     const h=await newProduct.save();
     console.log(h);
    return res.status(200).json({ message: "Product created successfull" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "server error" });
  }
};
const getAllProduct = async (req, res) => {
  try {
    const allProduct = await product.find({});
    if (!allProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json({ allProduct });
  } catch (err) {
    return res.status(500).json({ message: "server error" });
  }
};
const getProductById = async (req, res) => {
  const { productId } = req.params;
  console.log(productId);
  try {
    const productData = await product.findById(productId);
    if (!productData) {
      return res.status(404).json({ message: "product is not found" });
    }
    return res.status(200).json({ success: true, productData });
  } catch (err) {
    return res.status(500).json({ message: "server error" });
  }
};
const updateProductById = async (req, res) => {
  const { productId } = req.params;
  const { title, image } = req.body;
  try {
    const updateProduct = await product.findByIdAndUpdate(productId);
    if (!updateProduct) {
      return res.status(400).json({ message: "product not found " });
    }
    updateProduct.title = title;

    updateProduct.image = image;
    await updateProduct.save();
    return res.status(200).json({ message: "update successfull" });
  } catch (err) {
    return res.status(500).json({ message: "sever error" });
  }
};
const deleteProductById = async (req, res) => {
  const { productId } = req.params;
  console.log(productId);
  try {
    const deleteProduct = await product.findByIdAndDelete(productId);
    if (!deleteProduct) {
      return res.status(404).json({ message: "product is not found" });
    }
    return res.status(200).json({ message: "product deleted successfull" });
  } catch (err) {
    return res.status(500).json({ message: "sever error" });
  }
};
const deleteAllProduct = async (req, res) => {
  try {
    const deleteProduct = await product.deleteMany({});
    if (!deleteProduct) {
      return res.status(404).json({ message: "Product is not found" });
    }
    return res.status(200).json({ message: "Product deleted successfull" });
  } catch (err) {
    return res.status(500).json({ message: "sever error" });
  }
};
export default {
  createProduct,
  getAllProduct,
  getProductById,
  updateProductById,
  deleteProductById,
  deleteAllProduct,
};
