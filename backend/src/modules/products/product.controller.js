import product from "./product.schema.js";

export const getProducts = async (req, res) => {
  try {
    let products = await product.find();
    return res.send(products);
  } catch (error) {
    return res.status(500).send("Server Error");
  }
};

export const getProduct = async (req, res) => {
  let { slug } = req.params;
  let selectedProduct = await product.findOne({ slug });
  if (!selectedProduct) return res.status(404).send("Product not found");
  return res.send(selectedProduct);
};

export const createProduct = async (req, res) => {
  try {
    const {
      title,
      summary,
      description,
      price,
      inStock,
      quantity,
      mainImage,
      images,
      size,
      color,
      categories,
      metaTitle,
      metaDescription,
      metaKeywords,
    } = req.body;

    let userId = req.user._id;

    // Generate a URL-friendly slug here so the frontend doesn't have to <3
    let slug =
      title.replaceAll(" ", "-").toLowerCase() + "-" + new Date().getTime();

    await product.create({
      title,
      slug,
      summary,
      description,
      price,
      inStock,
      quantity,
      mainImage,
      images,
      size,
      color,
      categories,
      user: userId,
      metaTitle,
      metaDescription,
      metaKeywords,
    });
    res.status(201).send(`Product created successfully`);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
};

//TO REVIEW - I'm not sure if just the selected fields will be rewritten (the one where the user enters the value)
//or also the empty fields will be replaced  ⮟⮟⮟⮟⮟⮟⮟⮟⮟

export const updateProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    const changedProduct = await product.findByIdAndUpdate(
      productId,
      {
        title: req.body.title,
        slug: req.body.slug,
        summary: req.body.summary,
        description: req.body.description,
        price: req.body.price,
        oldPrice: req.body.oldPrice,
        inStock: req.body.inStock,
        quantity: req.body.quantity,
        mainImage: req.body.mainImage,
        images: req.body.images,
        size: req.body.size,
        color: req.body.color,
        categories: req.body.categories,
        metaTitle: req.body.metaTitle,
        metaDescription: req.body.metaDescription,
        metaKeywords: req.body.metaKeywords,
      },
      { new: true } // Return the updated product
    );

    if (!changedProduct) {
      return res.status(404).send("Product not found or could not be updated");
    }

    res.status(200).send(changedProduct);
  } catch (error) {
    console.error("Update error:", error.message);
    res.status(500).send("Server error");
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const unwantedProduct = await product.findByIdAndDelete(req.params.id);

    if (!unwantedProduct) return res.status(404).send("Product not found");
    res.status(200).json({ success: true, message: "Deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
