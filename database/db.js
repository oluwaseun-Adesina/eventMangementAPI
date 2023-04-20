const mongoose = require("mongoose");

 function connectDB() {
     mongoose.connect(process.env.dbURIlocal, { useNewUrlParser: true, useUnifiedTopology: true })
        //.then((result) => app.listen(3000))
        .then((result) => app.listen(process.env.PORT || 3000, function () {
            console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
        }))
        .catch((err) => console.log(err))
    // console.log("MongoDB connected");
} 

module.exports = connectDB;