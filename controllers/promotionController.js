import promotionModel from "../models/promotionModel.js";

// ADD Promotion
export const addPromotion = async (req, res) => {
  try {
    const { title, description, type, link } = req.body;

    const image = req.file ? req.file.path : "";

    const promotion = new promotionModel({
      title,
      description,
      type,
      link,
      image,
    });

    await promotion.save();

    res.json({ success: true, message: "Promotion Added Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// GET All Promotions
export const getPromotions = async (req, res) => {
  try {
    const promotions = await promotionModel.find({});
    res.json({ success: true, promotions });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// DELETE Promotion
export const deletePromotion = async (req, res) => {
  try {
    await promotionModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Promotion Deleted" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};