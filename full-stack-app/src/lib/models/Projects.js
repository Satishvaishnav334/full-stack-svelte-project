import mongoose from "mongoose";

const CounterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  value: { type: Number, default: 0 }
});

const Counter = mongoose.models.Counter || mongoose.model("Counter", CounterSchema);

const ProjectSchema = new mongoose.Schema({
  projectId: { type: Number, unique: true },
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Before saving → increment counter
ProjectSchema.pre("save", async function (next) {
  if (this.isNew) {
    const counter = await Counter.findOneAndUpdate(
      { name: "projectId" },
      { $inc: { value: 1 } },
      { new: true, upsert: true }
    );
    this.projectId = counter.value;
  }
  next();
});

export default mongoose.models.Project || mongoose.model("Project", ProjectSchema);
