
import mongoose from 'mongoose';

import {model , Schema} from 'mongoose';



const UserSchema = new Schema({
    username: { type: Schema.Types.String, required: true , unique: true},
    password: { type: Schema.Types.String, required: true }
});

export const UserModel = model( "User", UserSchema);

const  ContentSchema = new Schema({
    title: { type: Schema.Types.String, required: true },
    link: { type: Schema.Types.String },
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
    await mongoose.connect('');
    console.log('MongoDB connected');
  } catch (err: any) {
    console.error(err.message);
    process.exit(1);
  }
};
