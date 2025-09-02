// @ts-check
import { json } from "@sveltejs/kit";
import { connectDB } from "$lib/db.js";
import { getProjects,createProject ,deleteProject} from "$lib/controllers/projects/ProjectControllers";
/**
 * @param {import('@sveltejs/kit').RequestEvent} event
 */
export async function GET({ url }) {
  await connectDB();
  const projects = await getProjects();
  return json(projects);
}

/**
 * @param {import('@sveltejs/kit').RequestEvent} event
 */
export async function POST({ request }) {
  await connectDB();
  const data = await request.json();
  const project = await createProject(data);
  return json(project);
}


