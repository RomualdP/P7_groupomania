const mongoose = require("mongoose");

mongoose
  .connect(
    `mongodb+srv://${process.env.MongoDBLOGIN}@cluster0.oom1r.mongodb.net/groupomania`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Failed to connet to MongoDB", err));
