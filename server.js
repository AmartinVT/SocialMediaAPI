const express = require("express");
const { default: mongoose } = require("mongoose");
const db = require("./config/connection");
const { getUsers } = require("./controllers/userController");
const User = require("./models/User");
const routes = require("./routes");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});

const seedUsers = [
  {
    userName: 'username1',
    email: 'email1@email.com',
  },
  {
    userName: 'username2',
    email: 'email2@email.com',
  },
  {
    userName: 'username3',
    email: 'email3@email.com',
  },
  {
    userName: 'username4',
    email: 'email4@email.com',
  }
];

const seedDB = async () => {
  await User.deleteMany({});
  await User.insertMany(seedUsers);
};

// seedDB().then(() => {
//   mongoose.connection.close();
// })