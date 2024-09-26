const Service = require("../models/Service");
const User = require("../models/User");

const createService = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      budget,
      user,
      durationType,
      monthlyBudget,
      isAvailable,
    } = req.body;
    console.log("req.body");
    console.log(req.body);

    const oldService = await Service.findOne({ user: user });
    if (oldService) {
      res.status(401).json({ message: "Service already exists." });
      return;
    }
    const service = new Service({
      title,
      description,
      category,
      budget,
      user,
      durationType,
      monthlyBudget,
      isAvailable,
    });
    await service.save();
    res.json({ message: "Service created successfully!", service });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error creating service", error: error.message });
  }
};

const updateService = async (req, res) => {
  try {
    const { id } = req.query;
    const {
      title,
      description,
      category,
      budget,
      user,
      durationType,
      monthlyBudget,
      isAvailable,
    } = req.body;

    await Service.findByIdAndUpdate(id, {
      title,
      description,
      category,
      budget,
      user,
      durationType,
      monthlyBudget,
      isAvailable,
    });
    const updatedService = await Service.findById(id);
    res.json({ message: "Service updated successfully!", updatedService });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error creating service", error: error.message });
  }
};

const getServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error fetching service", error: error.message });
  }
};

const findServiceByUser = async (req, res) => {
  try {
    const { user } = req.query;
    const service = await Service.findOne({ user });
    if (service) {
      res.status(200).json({ service });
    } else {
      res.status(404).json({ message: "Service not found" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error fetching service", error: error.message });
  }
};

const fetchServiceProviders = async (services) => {
  let servicesWithProviders = [];
  for (let i = 0; i < services.length; i++) {
    let element = services[i];
    if (element.isAvailable) {
      const user = await User.findById(element.user);
      const item = {
        title: element.title,
        budget: element.budget,
        isAvailable: element.isAvailable,
        description: element.description,
        category: element.category,
        _id: element._id,
        monthlyBudget: element.monthlyBudget,
        durationType: element.durationType,
        area: user.area,
        gender: user.gender,
        age: user.age === 0 ? 25 : user.age,
        providerName: user.full_name,
        phoneNumber: user.phone_number,
        emailAddress: user.email_address,
        serviceProvider: user._id,
        profilePicture: user.profilePicture,
        bannedTill: element.bannedTill ? element.bannedTill : "01-JAN-2000",
      };
      servicesWithProviders.push(item);
    }
  }
  return servicesWithProviders;
};

const getServicesWithProviders = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(await fetchServiceProviders(services));
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error fetching service", error: error.message });
  }
};

const getServiceById = async (req, res) => {
  const { id } = req.query;

  try {
    const service = await Service.findById(id);
    if (service) {
      res.status(200).json(service);
    } else {
      console.log("could not find service");
      res.status(404).json({ message: "could not find service" });
    }
  } catch (error) {
    console.log("could not fetch service " + error);
    res
      .status(500)
      .json({ message: "Error fetching service", error: error.message });
  }
};

const banServiceById = async (req, res) => {
  const { id } = req.query;
  const { bannedTill } = req.body;
  try {
    const service = await Service.findById(id);
    if (service) {
      const updatedService = await Service.findByIdAndUpdate(id, {
        bannedTill: bannedTill,
      });
      res.status(200).json(updatedService);
    } else {
      console.log("could not find service");
      res.status(404).json({ message: "could not find service" });
    }
  } catch (error) {
    console.log("could not fetch service " + error);
    res
      .status(500)
      .json({ message: "Error fetching service", error: error.message });
  }
};

module.exports = {
  createService,
  getServices,
  findServiceByUser,
  updateService,
  getServicesWithProviders,
  getServiceById,
  banServiceById,
};
