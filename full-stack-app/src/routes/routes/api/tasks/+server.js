import { json } from "@sveltejs/kit";
import { connectDB } from "$lib/db.js";
import { createTask, getTasks, getTaskStats } from "$lib/controllers/taskController.js";

export async function GET({ url }) {
  await connectDB();
  const projectId = url.searchParams.get("projectId");
  const stats = url.searchParams.get("stats");

  if (stats) {
    const result = await getTaskStats(projectId);
    return json(result);
  }

  const tasks = await getTasks(projectId);
  return json(tasks);
}

export async function POST({ request }) {
  await connectDB();
  const data = await request.json();
  const task = await createTask(data);
  return json(task);
}
