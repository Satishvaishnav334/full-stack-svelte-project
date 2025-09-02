import { json } from "@sveltejs/kit";
import { connectDB } from "$lib/db";
import Task from "$lib/models/task";
// DELETE /api/tasks/:id
/**
 * @param {import('@sveltejs/kit').RequestEvent} event
 */
export async function DELETE({ params }) {
  try {
    await connectDB();
    console.log(params.id)
    const task = await Task.findByIdAndDelete(params.id);
    if (!task) {
      console.log(task)
      return json({ success: false, message: "Task not found" }, { status: 404 });
    }
    console.log(task)


    return json({ success: true, message: "Task deleted" });
  } catch (err) {
    console.error(err);
    return json({ success: false, message: "Server error" }, { status: 500 });
  }
}
