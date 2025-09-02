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

/**
 * Create a new task
 * @param {{ name: string}} id
 * @returns {Promise<any>}
 */

export async function deleteTask(id) {
  const task = await Task.findByIdAndDelete(id);
  if (!task) {
    console.log(task)
    return;
  }
  return task;
}
