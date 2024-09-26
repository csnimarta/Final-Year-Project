const Area = require("../models/Area");
const AreaRoutes = require("../routes/AreaRoutes");



const areas = [];

const createArea = async (req, res) => {
  try {
    const {name, zipcode, latitude, longitude} = req.body;
    console.log(longitude, latitude, name, zipcode);

    const area = new Area({
      name,
      zipcode,
      latitude,
      longitude,
    });

    const savedArea = await area.save();

    res.status(201).json({message: 'Area created successfully', area: savedArea});

  } catch (error) {
    res.status(500).json({message: 'Error creating area: ' + error.message});
  }
};




const getAreas = async (req, res) => {
  console.log('ehhhhhhhhhhh');
  try {
    const areas = await Area.find();
    res.status(200).json({
      message: "Areas found",
      status: 200,
      data: areas,
    });
  } catch (error) {
    res.status(500).json({message: 'Error fetching areas: ' + error.message});
  }
};




module.exports = {
  createArea,
  getAreas,
}


