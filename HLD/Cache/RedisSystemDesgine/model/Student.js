import mongoose from 'mongoose';
// import { jwtPlugin } from './plugin/AcessToken/AccessToken.js';
// import {referhjwtPlugin} from './plugin/ReferhToken/referhToken.js'
// import {  hashPassword} from  './plugin/passwordGenerated/passwordHash.js'
// import { PostNofication } from './plugin/Post_Notfication/Post_send.js';
// import {AdminTokens} from './plugin/MainAdmin/mainAdmin.js'
// // import shortid from 'shortid';

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  shortId: { type: String, unique: true },
  Admin: { type: Boolean, default: false },
  tokens: [{ token: String, date: { type: Date, default: Date.now } }],
  refreshTokens: [{ token: String, date: { type: Date, default: Date.now } }],
   adminMains: [{ token: String, date: { type: Date, default: Date.now } }],
  YearOld: { type: String }
});



// Date.prototype.lastYear=function(){
//    return this.getFullYear() - 1;
// }


// userSchema.methods.mysimple = async function () {
//   const date = new Date();
//   this.YearOld = (date.getFullYear() - 1).toString();
//   await this.save();
//   return this.YearOld;
// };





// // userSchema.pre('save' , function(){

// // })



// userSchema.plugin(jwtPlugin);
// userSchema.plugin(referhjwtPlugin)
// userSchema.plugin(hashPassword);
// userSchema.plugin(PostNofication );
// userSchema.plugin(AdminTokens)


export const Register = mongoose.model('Live', userSchema);
