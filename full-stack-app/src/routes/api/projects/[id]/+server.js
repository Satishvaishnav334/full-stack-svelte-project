import { json } from "@sveltejs/kit";
import { connectDB } from "$lib/db";
import Projects from "$lib/models/Projects";
// DELETE /api/tasks/:id
/**
 * @param {import('@sveltejs/kit').RequestEvent} event
 */
export async function DELETE({ params }) {
  try {
    await connectDB();
    console.log(params.id)
    const project = await Projects.findByIdAndDelete(params.id);
    if (!project) {
      console.log(project)
      return json({ success: false, message: "project not found" }, { status: 404 });
    }
    console.log(project)


    return json({ success: true, message: "project deleted" });
  } catch (err) {
    console.error(err);
    return json({ success: false, message: "Server error" }, { status: 500 });
  }
}
