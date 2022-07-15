const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const ObjectId = require("mongodb").ObjectId;

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://organicUser:${process.env.DB_PASSWORD}@cluster0.tibcl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
client.connect((err) => {
  // user database
  const queenZoneUser = client.db("QueenZ-Zone").collection("User");
  // perform actions on the collection object
  // lets start

  console.log("mongodb connected");

  // new user gmail and other info post server
  // post mongoDB
  app.post("/queenZoneCreateUser", (req, res) => {
    console.log(req.body);
    const newData = req.body;
    // insert Database
    queenZoneUser.insertOne(newData).then(function (result) {
      // process result
      console.log(result);
      res.send(result);
    });
  });

  // read find user emial and others info
  app.post("/queenZoneFindUser", function (req, res) {
    const newData = req.body.loggingUserInfo;

    console.log("heeeeeeeeeeeeeeeee : ", newData);

    queenZoneUser
      .find({ _id: ObjectId(newData) })
      .toArray(function (err, result) {
        console.log("this is find result 1", result);
        res.send(result);
      });
  });

  // read find all ===> user emial and others info
  app.get("/queenZoneFindAllUser", function (req, res) {
    const newData = req.body.loggingUserInfo;

    queenZoneUser.find().toArray(function (err, result) {
      console.log("this is find result 2", result);
      res.send(result);
    });
  });

  // check google pop user
  app.post("/queenZoneGooglePopUser", function (req, res) {
    const newData = req.body.localStroageuserInfo;
    console.log("this is find datattttttttttttttttt::::::::::  ", newData);

    queenZoneUser
      .find({ email: newData.email })
      .toArray(function (err, result) {
        console.log("this is find result 3", result);

        res.send(result);
      });

    //   this is check obj in mongodb
    // queenZoneUser
    //   .find({ "rony136ytu47@gmail.com": { $exists: true } })
    //   .toArray(function (err, result) {
    //     console.log("this is find exists ::::::   ", result);

    //     res.send(result);
    //   });
  });

  // check google pop user
  app.post("/queenZoneGooglePopUserFind", function (req, res) {
    const newData = req.body.props;
    console.log("this is find datattttttttttttttttt::::::::::  ", newData);

    queenZoneUser
      .find({ email: newData.email })
      .toArray(function (err, result) {
        console.log("this is find result 3", result);

        res.send(result);
      });

    //   this is check obj in mongodb
    // queenZoneUser
    //   .find({ "rony136ytu47@gmail.com": { $exists: true } })
    //   .toArray(function (err, result) {
    //     console.log("this is find exists ::::::   ", result);

    //     res.send(result);
    //   });
  });

  // update user info

  app.post("/queenZoneUserInfoUpdate", function (req, res) {
    const updateData = req.body.newData;
    console.log(updateData);

    queenZoneUser
      .updateOne(
        { email: updateData.email },
        {
          $set: {
            phoneNumber: updateData.phoneNumber,
            address: updateData.address,
            displayName: updateData.displayName,
          },
        }
      )
      .then(function (result) {
        // process result
        console.log(result);
        res.send(result);
      });
  });

  // ================== Product all things ========================

  // product databse

  const queenZoneProduct = client.db("QueenZ-Zone").collection("Product");
  // product post
  app.post("/queenZoneUserProductUpload", function (req, res) {
    const postData = req.body.productDetails;
    console.log("this is product upload ", postData);

    // insert Database
    queenZoneProduct.insertMany(postData).then(function (result) {
      // process result
      console.log(result);
      res.send(result);
    });
  });

  // fetch all product
  app.get("/queenZoneFindAllProduct", function (req, res) {
    const newData = req.body;

    queenZoneProduct.find().toArray(function (err, result) {
      //    console.log("this is find result 4", result);
      res.send(result);
    });
  });

  // delete product
  app.get("/queenZoneProductDelete/:PId", function (req, res) {
    const newData = req.params.PId;
    console.log("this is edit order : ", newData);

    try {
      queenZoneProduct.deleteOne({ _id: ObjectId(newData) });
    } catch (e) {
      print(e);
    }

    // queenZoneProduct
    //   .deleteOne({ _id: ObjectId(newData) })
    //   .toArray(function (err, result) {
    //     console.log("this is delete product : ", result);
    //     res.send(result);
    //   });
  });

  // ========================== ORDER ===========================

  const queenZoneOrder = client.db("QueenZ-Zone").collection("Order");

  // post order
  app.post("/queenZoneUserPostOrder", function (req, res) {
    const postData = [req.body.Finaldata];
    // console.log("this is product upload ", postData);

    // insert Database
    queenZoneOrder.insertMany(postData).then(function (result) {
      // process result
      //  console.log(result);
      res.send(result);
    });
  });

  // all order read

  app.get("/queenZoneAllOrder", function (req, res) {
    queenZoneOrder.find().toArray(function (err, result) {
      //  console.log("this is find result 77", result);
      res.send(result);
    });
  });

  // order find

  app.get("/queenZoneOrderFind/:UEmail", function (req, res) {
    const newData = req.params.UEmail;
    console.log(newData);

    queenZoneOrder.find({ UserEmail: newData }).toArray(function (err, result) {
      console.log("this is find result 5", result);
      res.send(result);
    });
  });

  // order find in order number for edit

  app.get("/queenZoneEditOrderFind/:Onumber", function (req, res) {
    const newData = req.params.Onumber;
    console.log("this is edit order : ", newData);

    queenZoneOrder
      .find({ _id: ObjectId(newData) })
      .toArray(function (err, result) {
        console.log("this is edit order : ", result);
        res.send(result);
      });
  });

  // order delete

  app.get("/queenZoneOrderDelete/:Onumber", function (req, res) {
    const newData = req.params.Onumber;
    console.log("this is edit order : ", newData);

    queenZoneOrder
      .deleteOne({ _id: ObjectId(newData) })
      .toArray(function (err, result) {
        console.log("this is edit order : ", result);
        res.send(result);
      });
  });

  // find single product for single product page
  app.get("/queenZoneSingleProduct/:PID", function (req, res) {
    const newData = req.params.PID;

    queenZoneProduct
      .find({ _id: ObjectId(newData) })
      .toArray(function (err, result) {
        console.log("this is find result 5", result);
        res.send(result);
      });
  });

  ///  =================== category ===================
  const queenZoneCategory = client.db("QueenZ-Zone").collection("Category");

  //read category
  app.get("/queenZoneCategoryRead", function (req, res) {
    const newData = req.body;

    //  console.log(newData);

    queenZoneCategory.find().toArray(function (err, result) {
      // console.log("this is find result 6", result);
      res.send(result);
    });
  });

  // post category

  app.post("/queenZoneCategoryPost", (req, res) => {
    // console.log(req.body);
    const postCa = req.body.postCategory;

    // insert Database

    const rendomNumber = Math.floor(Math.random() * 9000000000) + 1000000000;

    queenZoneCategory
      .insertOne({ postCa, _id: rendomNumber })
      .then(function (result) {
        // process result
        console.log(result);
        res.send(result);
      });
  });

  /// delete category
  app.post("/queenZoneCategoryDelete", (req, res) => {
    console.log(req.body);
    const postCa = req.body;

    // insert Database

    const rendomNumber = Math.floor(Math.random() * 9000000000) + 1000000000;

    queenZoneCategory
      .deleteOne({ postCa: postCa.props.postCa })
      .then(function (result) {
        // process result
        console.log(result);
        res.send(result);
      });
  });

  ///  =================== category Layout ===================

  const queenZoneCategoryLayout = client
    .db("QueenZ-Zone")
    .collection("CategoryLayout");

  // submit Category layout
  app.post("/queenZoneCategoryLayout", (req, res) => {
    const postCa = req.body;
    console.log(postCa.SubPro.layout);
    // insert Database

    const rendomNumber = Math.floor(Math.random() * 9000000000) + 1000000000;

    queenZoneCategoryLayout
      .updateOne(
        { _id: ObjectId("6261aa903e70c1e588a8e750") },
        { $set: { layout: postCa.SubPro.layout } }
      )
      .then(function (result) {
        // process result
        console.log(result);
        res.send(result);
      });
  });

  // get cetagory layout

  app.get("/queenZoneCategoryLayoutRead", function (req, res) {
    const newData = req.body;

    console.log(newData);

    queenZoneCategoryLayout.find().toArray(function (err, result) {
      console.log("this is find result 6", result);
      res.send(result);
    });
  });

  // end
});

app.listen(PORT, function () {
  console.log(`Example app listening at 5000`);
});
