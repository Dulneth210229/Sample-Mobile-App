import Book from "../model/Book";
import cloudinary from "../lib/cloudinary.js";

const booksController = {
  create: async (req, res) => {
    try {
      const { title, caption, rating, image } = req.body;
      if (!title || !caption || !rating || !image)
        return res.status(400).json({ message: "All fields must be filled" });

      //upload the image to cloudinary
      const uploadResponse = await cloudinary.uploader.upload(image);
      const imageUrl = uploadResponse.secure_url;
      //Save to the data base

      const newBook = new Book({
        title,
        caption,
        rating,
        image: imageUrl,
      });
    } catch (error) {}
  },
};
