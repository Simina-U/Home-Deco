//seting up the server and packages required
require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Item = require("./models/item");
const Category = require("./models/category");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/img");
  },
  //add back the file extension
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

//Connect to DB
const db =
  "mongodb+srv://simina:25071991@cluster0.j4ngs.mongodb.net/Home-Deco-Shop?retryWrites=true&w=majority";
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(3000);
    console.log(`Server is up and running && connected to DB`);
  })
  .catch((err) => res.send.status(500));

//set view
app.set("view engine", "ejs");

//enable middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

//define storage for the images

//Routes
app.get("/", (req, res) => {
  res.redirect("/all-items");
});

app.get("/all-items", (req, res) => {
  Item.find()
    .populate("item-category")
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", {
        title: "All products",
        items: result,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/all-items", upload.single("image"), (req, res) => {
  const item = new Item(
    /*req.body, req.file.filename*/ {
      "item-name": req.body["item-name"],
      "item-category": req.body["item-category"],
      image: req.file.filename,
      "item-description": req.body["item-description"],
      "seller-name": req.body["seller-name"],
      "seller-email": req.body["seller-email"],
      quantity: req.body.quantity,
      price: req.body.price,
    }
  );
  item
    .save()
    .then((result) => {
      console.log(req.file.path);
      res.redirect("/all-items");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/all-categories", (req, res) => {
  Category.find()
    .then((result) => {
      res.render("all-categories", {
        title: "Catalogue",
        categories: result,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

// app.post("/all-categories", (req, res) => {
//   const category = new Category(req.body);
//   category
//     .save()
//     .then((result) => {
//       res.render("all-categories");
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });
//single item view
app.get("/all-items/:id", (req, res) => {
  const id = req.params.id;
  Item.findById(id)
    .then((result) => {
      res.render("product", {
        item: result,
        title: "Detailed View",
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/all-categories/:id", (req, res) => {
  const id = req.params.id;
  Item.find({ "item-category": id })
    .then((result) => {
      res.render("category", {
        title: "All ",
        items: result,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/new", (req, res) => {
  res.render("new", { title: "New Entry" });
});

app.get("/about-us", (req, res) => {
  res.render("about-us", {
    title: "About Us",
  });
});

app.delete("/all-items/:id", (req, res) => {
  const id = req.params.id;
  Item.findByIdAndDelete(id)
    .then(() => {
      res.redirect("all-items");
    })
    .catch((err) => {
      console.log(err);
    });
});

//default route 404 for no result to req
app.use((req, res) => {
  res.status(404).render("404", {
    title: "404",
  });
});
