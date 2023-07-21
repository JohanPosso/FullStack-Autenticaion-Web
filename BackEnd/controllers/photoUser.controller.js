const User = require("../models/user.model");
const Photo = require("../models/photo.model");

const allPhotoUser = async (req, res) => {
  try {
    const findAlaUser = await User.findOne({
      where: { email: req.user.email },
    });
    const findAllPhoto = await Photo.findAll({
      where: { UserId: findAlaUser.id },
    });
    res.json(findAllPhoto);
  } catch (error) {
    console.log(error);
  }
};

module.exports = allPhotoUser;
