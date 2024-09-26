const Complaint = require('../models/Complaints');

const createComplaint = async (req, res) => {
  try {
    const {title, description, createdBy, createdFor, order, status, severity} = req.body;

    if (!title || !description || !createdBy || !createdFor || !order || !severity) {
      return res.status(400).json({message: 'Some fields are missing'});
    }

    const newComplaint = new Complaint({
      title, description, createdBy, createdFor, order, severity
    });

    const savedComplaint = await newComplaint.save();
    res.status(201).json(savedComplaint);
  } catch (error) {
    console.error('Error creating complaint:', error);
    res.status(500).json({message: 'Internal server error'});
  }
};

const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find();
    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({message: 'Internal server error', error: error.message});
  }
};

const getComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({message: 'Complaint not found'});
    }
    res.status(200).json(complaint);
  } catch (error) {
    res.status(500).json({message: 'Internal server error', error: error.message});
  }
};

const resolveComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({message: 'Complaint not found'});
    }

    complaint.status = 'Resolved';
    const resolvedComplaint = await complaint.save();

    res.status(200).json(resolvedComplaint);
  } catch (error) {
    res.status(500).json({message: 'Internal server error', error: error.message});
  }
};


const updateComplaintById = async (req, res) => {

  const {adminResponse, status} = req.body;
  const {_id} = req.query;

  try {
    await Complaint.findByIdAndUpdate(_id, {
      adminResponse, status
    });

    const resolvedComplaint = await Complaint.findById(_id);
    console.log(resolvedComplaint);
    res.status(200).json(resolvedComplaint);
  } catch (error) {
    res.status(500).json({message: 'Internal server error', error: error.message});
  }
};

module.exports = {
  createComplaint,
  getAllComplaints,
  getComplaintById,
  resolveComplaintById,
  updateComplaintById
};
