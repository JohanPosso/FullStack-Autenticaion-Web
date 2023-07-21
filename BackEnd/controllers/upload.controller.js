const AWS = require("../helpers/aws.sdk");
const fs = require("fs");
const path = require("path");
const Photo = require("../models/photo.model");
const User = require("../models/user.model");
const uploadProfile = async (req, res) => {
  try {
    const filePath = path.join(__dirname, "../uploads", req.file.filename);

    const params = {
      Bucket: "node-images-upload",
      Body: fs.createReadStream(filePath),
      Key: "images/" + path.basename(filePath),
      ACL: "public-read",
    };

    const s3 = new AWS.S3();
    s3.upload(params, async function (err, data) {
      try {
        console.log("Uploaded in:", data.Location);
        const findUser = await User.findOne({
          where: { email: req.user.email },
        });
        await Photo.create({
          ph_reference: data.Location,
          UserId: findUser.id,
        });
        res.json({ message: "Foto cargada exitosamente" });
      } catch (error) {
        console.log("Error", err, error);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const downloadProfile = async (req, res) => {
  try {
    const userProfile = await User.findOne({
      where: { email: req.user.email },
    });
    const photoprofile = await Photo.findOne({
      where: { UserId: userProfile.id },
      order: [["createdAt", "DESC"]],
    });
    console.log(photoprofile.ph_reference);
    res.json({
      ph_reference: photoprofile.ph_reference,
      message: "Imagen cargada exitosamente!",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { uploadProfile, downloadProfile };
