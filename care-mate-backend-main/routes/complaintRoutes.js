const express = require('express');
const router = express.Router();
const {createComplaint, getAllComplaints, getComplaintById, resolveComplaintById,
    updateComplaintById
} = require("../controllers/complaintController");

router.post('/create', createComplaint);
router.get('/all', getAllComplaints);
router.get('/:id', getComplaintById);
router.put('/:id/resolve', resolveComplaintById);
router.put('/update', updateComplaintById);

module.exports = router;







