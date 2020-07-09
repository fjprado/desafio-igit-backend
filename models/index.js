import mongoose from "mongoose";
import studentModel from "./studentModel.js";

const db = {};
db.mongoose = mongoose;
db.url = process.env.MONGOURL;
db.student = studentModel(mongoose);

export { db };
