import mongoose from "mongoose";

export const connect_db = async () => {
  try {
    const DATABASE_URL = process.env.MONGO_URI;

    if (!DATABASE_URL) {
      throw new Error("❌ DATABASE_URL (MONGO_URI) not found in .env");
    }

    await mongoose.connect(DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // timeout after 10s if can't connect
    });

    console.log("✅ Connected to MongoDB successfully!");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1);
  }
};

// GridFS setup (for file uploads)
let gfs;
mongoose.connection.once("open", () => {
  gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: "uploaded_files",
  });
  console.log("📦 GridFSBucket initialized!");
});

export { gfs };



// import mongoose from "mongoose";

// export const connect_db = async (DATABASE_URL) => {
//     try {
//         await mongoose.connect(DATABASE_URL);
//         console.log("Connected to Database Successfully !");
//     } catch (err) {
//         console.log(err);
//     }
// };

// let gfs;
// mongoose.connection.once('open', () => {
//     gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
//         bucketName: 'uploaded_files',
//     });
// });

// export { gfs };