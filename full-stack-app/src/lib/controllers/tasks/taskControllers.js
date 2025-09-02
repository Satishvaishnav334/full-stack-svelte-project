// @ts-check
import mongoose from "mongoose";
import Task from "$lib/models/task";
/**
 * Get tasks by projectId
 
 * @returns {Promise<any[]>}
 */
export async function getTasks() {
  return Task.find();
}

/**
 * Create a new task
 * @param {{ title: string, projectId: string, status?: string }} data
 * @returns {Promise<any>}
 */
export async function createTask(data) {
  console.log(data)
  const task = new Task(data);
  console.log(task)
  return task.save();
}


// export async function getTaskStats(projectId) {
  // return Task.aggregate([
  //   { $match: { projectId: new mongoose.Types.ObjectId(projectId) } },
  //   { $group: { _id: "$status", count: { $sum: 1 } } }
  // ]);
// }
