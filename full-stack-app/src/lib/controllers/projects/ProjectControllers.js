// @ts-check
import mongoose from "mongoose";
import Projects from "$lib/models/Projects.js";
/**
 * Get tasks by projectId
 
 * @returns {Promise<any[]>}
 */
export async function getProjects() {
  return Projects.find();
}

/**
 * Create a new task
 * @param {{ name: string}} data
 * @returns {Promise<any>}
 */
export async function createProject(data) {
  console.log(data)
  const project = new Projects(data);
  console.log(project)
  return project.save();
}
/**
 * Create a new task
 * @param {{ name: string}} id
 * @returns {Promise<any>}
 */

export async function deleteProject(id) {
  const project = await Projects.findByIdAndDelete(id);
  if (!project) {
    console.log(project)
    return;
  }
  return project;
}
