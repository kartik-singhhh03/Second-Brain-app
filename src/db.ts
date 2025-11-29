
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import {model , Schema} from 'mongoose';

dotenv.config();



const UserSchema = new Schema({
    username: { type: Schema.Types.String, required: true , unique: true},
    password: { type: Schema.Types.String, required: true }
});

export const UserModel = model( "User", UserSchema);

const  ContentSchema = new Schema({
    title: { type: Schema.Types.String, required: true },
    link: { type: Schema.Types.String },
    type: { type: Schema.Types.String, default: 'link' },
    tags: [{ type: mongoose.Types.ObjectId, ref: 'Tag' }],
    userId:{type: mongoose.Types.ObjectId, ref: 'User', required: true },
    authorId: { type: Schema.Types.String,ref : 'User' },
     } );


const  LinkSchema = new Schema({
    hash: { type: Schema.Types.String, required: true },
    
    userId:{type: mongoose.Types.ObjectId, ref: 'User', required: true , unique: true },
   
}, );

export const LinkModel = model( "Links", LinkSchema);

   
   

export const ContentModel = model( "Content", ContentSchema);








export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://kartiksingh3337:LRuxds1xgKjzZSSI@cluster0.ekxflnu.mongodb.net/Brainly';
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected');
  } catch (err: any) {
    console.error(err.message);
    process.exit(1);
  }
};
