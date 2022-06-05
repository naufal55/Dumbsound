const express = require("express");

const router = express.Router();
const {
    register, login,addTransaction ,getTransactions, updateTransaction, addArtist, getArtists, addMusic, getMusics, checkAuth, getTransaction 
  } = require("../controllers");

  //middleware auth
  const {auth} = require('../middlewares/auth');
const { multiFile } = require("../middlewares/multiUpload");
  const {uploadFile} = require('../middlewares/uploadFile')

  //auth
    router.post("/register", register);
    router.post("/login", login);
    router.get("/check-auth", auth, checkAuth);
    // router.get("/check-auth",auth, checkAuth);

    //transaction
    router.post("/transaction",auth, uploadFile("bukti"), addTransaction);
    router.get("/transactions",auth, getTransactions);
    router.get("/transaction/:id",auth, getTransactions);
    router.patch("/transaction/:id",auth, updateTransaction);

    //artist
    router.post("/artist",auth,addArtist);
    router.get("/artists",auth, getArtists);

    //music
    router.post("/music",auth, multiFile("song","filesong"), addMusic);
    router.get("/musics",auth, getMusics);
    // router.delete("/product/:id",auth, deleteProduct);

module.exports = router;