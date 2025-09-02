import { json } from "@sveltejs/kit";
import { deleteTask } from "$lib/controllers/tasks/taskControllers";
/**
 * DELETE /api/projects/:id
 * @param {import('@sveltejs/kit').RequestEvent} event
 */
export async function DELETE({ params }) {
  try {
    const deleted = await deleteTask(params.id);
    return json({ success: true, message: "Task deleted", deleted });
  } catch (err) {
    console.error(err);
    return json({ success: false, message: "Server error" }, { status: 500 });
  }
}
