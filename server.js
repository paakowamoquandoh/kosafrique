process.env.NODE_ENV = "production";

import express from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  collection,
  setDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import stripe from "stripe";
import nodemailer from "nodemailer";
import cors from "cors";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2LQfXwFv-VOdPSDJOoMmI2YhJZ0MVx-M",
  authDomain: "kosafrique.firebaseapp.com",
  projectId: "kosafrique",
  storageBucket: "kosafrique.appspot.com",
  messagingSenderId: "1024320135707",
  appId: "1:1024320135707:web:b1a8ed9ff17a429542cebe",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const db = getFirestore();

//init server
const app = express();
app.use(cors());

//middlewares
app.use(express.static("public"));
app.use(express.json());

//stripe
const stripeInstance = stripe(process.env.STRIPE_KEY);

app.post("/create-checkout-session", async (req, res) => {
  try {
    const stripeSession = await stripeInstance.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.SERVER_URL}/succes.html`,
      cancel_url: `${process.env.SERVER_URL}/cancel.html`,
    });
    res.json({ url: stripeSession.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//routes
//home
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: "public" });
});

<<<<<<< HEAD
app.listen(2000);
=======
app.listen(4001, () => {
  console.log("listening on port 4001......");
});
>>>>>>> f786743a010b0207cd6a414ca91a14eb604250e4

//signup
app.get("/signup", (req, res) => {
  res.sendFile("signup.html", { root: "public" });
});

app.post("/signup", (req, res) => {
  const { name, email, password, number, termsAndConditions } = req.body;

  //formvalidations
  if (name.length < 3) {
    res.json({ alert: "name must be 3 letters" });
  } else if (!email.length) {
    res.json({ alert: "enter your email" });
  } else if (password.length < 8) {
    res.json({ alert: "password must be 8 letters long" });
  } else if (!Number(number) || number.length < 10) {
    res.json({ alert: "invalid number, please enter valid one" });
  } else if (!termsAndConditions) {
    res.json({ alert: "you must agree to our terms and conditions" });
  } else {
    //add user to database
    const users = collection(db, "users");

    getDoc(doc(users, email)).then((user) => {
      if (user.exists()) {
        return res.json({ alert: "email already exists" });
      } else {
        //encrypt password
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            req.body.password = hash;
            req.body.seller = false;

            //set the doc
            setDoc(doc(users, email), req.body).then((data) => {
              res.json({
                name: req.body.name,
                email: req.body.email,
                seller: req.body.seller,
              });
            });
          });
        });
      }
    });
  }
});

app.get("/login", (req, res) => {
  res.sendFile("login.html", { root: "public" });
});

app.post("/login", (req, res) => {
  let { email, password } = req.body;

  if (!email.length || !password.length) {
    return res.json({ alert: "fill in all iputs" });
  }

  const users = collection(db, "users");

  getDoc(doc(users, email)).then((user) => {
    if (!user.exists()) {
      return res.json({ alert: "email does not exists" });
    } else {
      bcrypt.compare(password, user.data().password, (err, result) => {
        if (result) {
          let data = user.data();
          return res.json({
            name: data.name,
            email: data.email,
            seller: data.seller,
          });
        } else {
          return res.json({ alert: "password is incorrect" });
        }
      });
    }
  });
});

//aboutus
app.get("/aboutus", (req, res) => {
  res.sendFile("aboutus.html", { root: "public" });
});

//checkout
app.get("/checkout", (req, res) => {
  res.sendFile("checkout.html", { root: "public" });
});

//404 error
app.get("/404", (req, res) => {
  res.sendFile("404.html", { root: "public" });
});

app.use((req, res) => {
  res.redirect("/404");
});
