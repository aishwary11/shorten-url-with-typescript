import bcrypt from 'bcrypt';
import mongoose, { Document, Model } from 'mongoose';

export interface User extends Document {
  email: string;
  password: string;
  username: string;
}

const UserSchema = new mongoose.Schema<User>(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

UserSchema.pre<User>('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const UserModel: Model<User> = mongoose.model<User>('User', UserSchema);
export default UserModel;
