import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  username: String,
  content: String,
  image: { type: String, default: "" }, // Cloudinary URL
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Message', messageSchema);
