import Task from "../models/task.js";

export async function getTasks(projectId) {
  return Task.find({ projectId });
}

export async function createTask(data) {
  const task = new Task(data);
  return task.save();
}

export async function getTaskStats(projectId) {
  return Task.aggregate([
    { $match: { projectId: new Task.db.Types.ObjectId(projectId) } },
    { $group: { _id: "$status", count: { $sum: 1 } } }
  ]);
}
