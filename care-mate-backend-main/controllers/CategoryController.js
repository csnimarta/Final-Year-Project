const express = require("express");
const Category = require("../models/Category");


const createCategory = async (req, res) => {
  try {
    const {title, durationType, preferenceName, icon} = req.body;
    const newCategory = new Category({
      title,
      durationType,
      preferenceName,
      icon
    });
    const savedCategory = await newCategory.save();
    res.status(201).json({message: "Category created successfully", category: savedCategory});
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Internal server error", error: error.message});
  }
};

// Get all services
const getAllCategories = async (req, res) => {
  try {
    const services = await Category.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({message: "Internal server error"});
  }
};


const updateCategory = async (req, res) => {
  try {
    const {id} = req.query;

    const category = await Category.findById(id);
    const updatedCategory = await Category.updateOne({_id: id}, req.body);
    console.log();
    console.log(req.body);
    res.status(200).json({
      updatedCategory
    });
  } catch (error) {
    res.status(500).json({message: "Internal server error: " + error});
  }
};


const deleteCategory = async (req, res) => {
  try {
    const {id} = req.query;
    const category = await Category.findByIdAndDelete(id);
    res.status(201).json({
      id
    });
  } catch (error) {
    res.status(500).json({message: "Internal server error: " + error});
  }
};

module.exports = {
  updateCategory,
  createCategory,
  getAllCategories,
  deleteCategory,
};