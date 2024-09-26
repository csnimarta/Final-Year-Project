const express = require("express");
const router = express.Router();

const {createCategory, getAllCategories, updateCategory, deleteCategory} = require("../controllers/CategoryController");

router.post("/createCategory", createCategory);
router.get("/getAllCategories", getAllCategories);
router.put("/updateCategory", updateCategory);
router.delete("/deleteCategory", deleteCategory);

module.exports = router;