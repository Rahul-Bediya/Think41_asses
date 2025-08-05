const fs = require("fs");
const csv = require("csv-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const User = require("./models/User");
const Order = require("./models/Order");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const loadCSV = (path, Model) => {
  return new Promise((resolve, reject) => {
    const data = [];
    fs.createReadStream(path)
      .pipe(csv())
      .on("data", (row) => {
        // Convert string to Date where needed
        for (let key in row) {
          if (key.includes("at") || key.includes("created")) {
            row[key] = row[key] ? new Date(row[key]) : null;
          }
          if (key === "age" || key === "postal_code" || key === "num_of_item") {
            row[key] = row[key] ? Number(row[key]) : null;
          }
        }
        data.push(row);
      })
      .on("end", async () => {
        try {
          await Model.deleteMany();
          await Model.insertMany(data);
          console.log(`Inserted ${data.length} records into ${Model.collection.collectionName}`);
          resolve();
        } catch (err) {
          reject(err);
        }
      });
  });
};

(async () => {
  try {
    await loadCSV("data/users.csv", User);
    await loadCSV("data/orders.csv", Order);
    mongoose.disconnect();
  } catch (error) {
    console.error("Error loading CSV data:", error);
  }
})();
