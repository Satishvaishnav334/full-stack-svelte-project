// @ts-check
import Task from "../models/task.js";
import mongoose from "mongoose";

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
