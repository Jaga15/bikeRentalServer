const mongoose = require("mongoose");

//Connection to Db
const connect = () => {
    return mongoose.connect(process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connect;