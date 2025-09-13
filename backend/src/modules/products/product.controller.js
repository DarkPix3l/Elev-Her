import product from "./product.schema.js";
import supabase from "../../lib/superbaseClient.js";
import { v4 as uuidv4 } from "uuid";
import SUPABASE_BUCKET_PRODUCT from "../../config/variable.js";

export const getProducts = async (req, res) => {
  try {
    let products = await product.find();
    return res.send(products);
  } catch (error) {
    console.error(error);
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
    // Destructure ONLY non-image fields from req.body.
    // mainImage and images will come from req.files after upload.
    const { title, summary, description, price, inStock, quantity, sizes, color, categories, metaTitle, metaDescription, metaKeywords } = req.body;

    const mainImageFile = req.files && req.files["mainImage"] ? req.files["mainImage"][0] : null;
    const imagesFiles = (req.files && req.files["images"]) || [];

    let mainImagePublicUrl = "";
    let imagesPublicUrls = [];

    // --- UPLOAD MAIN IMAGE ---
    if (mainImageFile) {
      const fileExtension = mainImageFile.originalname.split(".").pop();
      const fileName = `${uuidv4()}.${fileExtension}`;
      const filePath = `${fileName}`;

      const { error } = await supabase.storage.from(SUPABASE_BUCKET_PRODUCT).upload(filePath, mainImageFile.buffer, {
        contentType: mainImageFile.mimetype,
        upsert: false,
      });

      if (error) {
        console.error("Error uploading main image to Supabase:", error);
        return res.status(500).send("Error uploading main image.");
      }
      mainImagePublicUrl = supabase.storage.from(SUPABASE_BUCKET_PRODUCT).getPublicUrl(filePath).data.publicUrl;
    }

    // --- UPLOAD ADDITIONAL IMAGES ---
    for (const file of imagesFiles) {
      const fileExtension = file.originalname.split(".").pop();
      const fileName = `${uuidv4()}.${fileExtension}`;
      const filePath = `${fileName}`;

      const { error } = await supabase.storage.from(SUPABASE_BUCKET_PRODUCT).upload(filePath, file.buffer, {
        contentType: file.mimetype,
        upsert: false,
      });

      if (error) {
        console.error("Error uploading additional image to Supabase:", error);
        // Continue loop if one image fails, don't stop the whole product creation
        continue;
      }
      imagesPublicUrls.push(supabase.storage.from(SUPABASE_BUCKET_PRODUCT).getPublicUrl(filePath).data.publicUrl);
    }

    /* let userId = req.user._id; */
    let fixedUserId = "685947d04abbb819bccdddc2";

    // Generate a URL-friendly slug here so the frontend doesn't have to <3
    let slug = title.replaceAll(" ", "-").toLowerCase() + "-" + new Date().getTime();

    await product.create({
      title,
      slug,
      summary,
      description,
      price,
      inStock,
      quantity,
      mainImage: mainImagePublicUrl,
      images: imagesPublicUrls,
      sizes,
      color,
      categories,
      user: fixedUserId,
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
