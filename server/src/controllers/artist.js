const { artist } = require("../../models");

exports.addArtist = async (req, res) => {
  try {
    const artistExist = await artist.findOne({
      where: {
        name: req.body.name,
      },
    });
    if (artistExist) {
      return res.status(400).send({
        status: "failed already",
        message: "This Artist already exist",
      });
    }

    const data = await artist.create(req.body);

    res.status(201).send({
      status: "success",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getArtists = async (req, res) => {
  try {
    let data = await artist.findAll({
      attributes: {
        exclude: [ "createdAt", "updatedAt"],
      },
    });

    res.status(201).send({
      status: "success",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      status: "failed",
      message: "Server Error",
    });
  }
};