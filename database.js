if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const mongoose = require("mongoose");
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);
mongoose.set("useFindAndModify", false);

class Database {
  constructor() {
    this.connect();
  }

  connect() {
    mongoose
      .connect(process.env.DB_CONNECTION)
      .then(() => {
        console.log("# database connection successful");
      })
      .catch((err) => {
        console.log("# database connection error", err);
      });
  }
}

module.exports = new Database();
