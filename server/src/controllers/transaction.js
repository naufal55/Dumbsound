const { user, transaction } = require("../../models");

exports.addTransaction = async (req, res) => {
  try {
    const transactionExist = await transaction.findOne({
      where: {
        idUser: req.user.id,
      },
    });
    if (transactionExist) {
      return res.status(400).send({
        status: "failed already",
        message: "This transaction already exist",
      });
    }

    let data = await transaction.create({
      ...req.body,
      bukti: req.file.filename,
      remaining: 30,
      userStatus: "Not Active",
      paymentStatus: "cancel",
      //diambil dari token di convert req.user.id
      idUser: req.user.id,
    });
    
    newData = JSON.parse(JSON.stringify(data));

    newData = {
      //spread operator ...
      ...newData,
      // memasukkan data namafile + dengan path filenya
      bukti: process.env.FILE_PATH + newData.bukti,
    };

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

exports.getTransactions = async (req, res) => {
  try {
    let data = await transaction.findAll({
      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "password",
              "email",
              "gender",
              "phone",
              "address",
              "status",
            ],
          },
        },
      ],
      attributes: {
        exclude: ["updatedAt"],
      },
    });

    data = JSON.parse(JSON.stringify(data));

    data = data.map((item) => {
      return {
        ...item,
        bukti: process.env.FILE_PATH + item.bukti,
      };
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

exports.getTransaction = async (req, res) => {
  const { id } = req.params;
  try {
    let data = await transaction.findOne({
      where: {
        idUser:id,
      },
      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "password",
              "email",
              "gender",
              "phone",
              "address",
              "status",
            ],
          },
        },
      ],
      attributes: {
        exclude: ["updatedAt"],
      },
    });

    data = JSON.parse(JSON.stringify(data));

    data = data.map((item) => {
      return {
        ...item,
        bukti: process.env.FILE_PATH + item.bukti,
      };
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

exports.updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const datatransaction = {
      //optional chaining untuk menampilkan data yg undfined jika tidak data tdk diupdate
      userStatus: req?.body?.userStatus,
      paymentStatus: req?.body?.paymentStatus,
    };

    await transaction.update(datatransaction, {
      //update set values where
      where: {
        idUser: id,
      },
    });

    let data = await transaction.findOne({
      // select ... where ...
      where: {
        idUser: id,
      },
      attributes: {
        exclude: ["password", "createdAt", "updatedAt", "idUser"], // pengecualian 3 item tdk dtampilkan
      },
    });

    // data = JSON.parse(JSON.stringify(data));
    newData = JSON.parse(JSON.stringify(data));

    newData = {
      //spread operator ...
      ...newData,
      // memasukkan data namafile + dengan path filenya
      bukti: process.env.FILE_PATH + newData.bukti,
    };

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
