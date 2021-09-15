import mongoose from "mongoose";
mongoose.connect(
    process.env.MONGO_URI || 'mongodb://localhost:8080/blogs',
    { useUnifiedTopology: true },
)

export default mongoose;
