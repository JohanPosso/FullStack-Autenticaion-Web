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
    const elementos = [];
    for (const key in findAllPhoto) {
      elementos.push({
        id_photo: findAllPhoto[key].dataValues.id_photo,
        userCreator: findAlaUser.name,
        ph_reference: findAllPhoto[key].dataValues.ph_reference,
        createdAt: findAllPhoto[key].dataValues.createdAt,
      });
    }
    res.json(elementos);
  } catch (error) {
    console.log(error);
  }
};

module.exports = allPhotoUser;
