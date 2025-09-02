// @ts-check
import { json } from "@sveltejs/kit";
import { connectDB } from "$lib/db.js";
import { createTask, getTasks } from "$lib/controllers/tasks/taskControllers.js";

/**
 * @param {import('@sveltejs/kit').RequestEvent} event
 */
export async function GET({ url }) {
  await connectDB();
  // const projectId = url.searchParams.get("projectId");
  // const stats = url.searchParams.get("stats");
  
  // if (stats) {
  //   const result = await getTaskStats(projectId);
  //   return json(result);
  // }

  const tasks = await getTasks();
  return json(tasks);
}

/**
 * @param {import('@sveltejs/kit').RequestEvent} event
 */
export async function POST({ request }) {
  await connectDB();
  const data = await request.json();
  const task = await createTask(data);
  return json(task);
}
