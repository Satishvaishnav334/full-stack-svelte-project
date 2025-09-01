<script>
  let tasks = [];
  let newTask = "";
  let projectId = "replace_with_project_id";

  async function loadTasks() {
    const res = await fetch(`/api/tasks?projectId=${projectId}`);
    tasks = await res.json();
  }

  async function addTask() {
    await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTask, projectId })
    });
    newTask = "";
    loadTasks();
  }

  loadTasks();
</script>

<h1>Task Manager</h1>

<input bind:value={newTask} placeholder="New Task..." />
<button on:click={addTask}>Add</button>

<ul>
  {#each tasks as task}
    <li>{task.title} - {task.status}</li>
  {/each}
</ul>
