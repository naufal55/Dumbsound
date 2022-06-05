const { music,artist } = require("../../models");

exports.addMusic = async (req, res) => {
  try {
    let data = await music.create({
      ...req.body,
      song: req.files.song[0].filename,
      filesong: req.files.filesong[0].filename,
    });
    // console.log(req)
    // console.log(req.files);
    // console.log(req.files);
    newData = JSON.parse(JSON.stringify(data));

    newData = {
      //spread operator ...
      ...newData,
      // memasukkan data namafile + dengan path filenya
      song: process.env.FILE_PATH + newData.song,
      filesong: process.env.FILE_PATH + newData.filesong,
    };
    console.log(newData);
    res.status(201).send({
      status: "success",
      newData,
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getMusics = async (req, res) => {
  try {
    let dataawal = await music.findAll({
      include: {
        model: artist,
        as: "artist",
        attributes: {
          exclude: ["createdAt", "updatedAt","old","solo","startCareer"],
        },
      },
      attributes: {
        exclude: [ "createdAt", "updatedAt"],
      },
    });

    data = JSON.parse(JSON.stringify(dataawal));

    data = data.map((item) => {
      return {
      ...item,
      // memasukkan data namafile + dengan path filenyaa
      song: process.env.FILE_PATH + item.song,
      filesong: process.env.FILE_PATH + item.filesong,
      }
    }) 

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