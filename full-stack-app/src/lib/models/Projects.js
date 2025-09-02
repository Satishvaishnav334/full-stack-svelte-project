import mongoose from "mongoose";
import AutoIncrementFactory from "mongoose-sequence";

// Define schema
const ProjectSchema = new mongoose.Schema({
  projectId: { type: Number, unique: true },
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// @ts-ignore → tell TS to stop type checking here
const AutoIncrement = AutoIncrementFactory(mongoose);

// @ts-ignore → silence TS, runtime works fine
ProjectSchema.plugin(AutoIncrement, { inc_field: "projectId" });

export default mongoose.models.Project || mongoose.model("Project", ProjectSchema);
