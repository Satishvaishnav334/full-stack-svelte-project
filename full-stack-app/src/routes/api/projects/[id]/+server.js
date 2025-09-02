import { json } from "@sveltejs/kit";
import { deleteProject } from "$lib/controllers/projects/ProjectControllers.js";

/**
 * DELETE /api/projects/:id
 * @param {import('@sveltejs/kit').RequestEvent} event
 */
export async function DELETE({ params }) {
  try {
    const deleted = await deleteProject(params.id);
    return json({ success: true, message: "Project deleted", deleted });
  } catch (err) {
    console.error(err);
    return json({ success: false, message: "Server error" }, { status: 500 });
  }
}
