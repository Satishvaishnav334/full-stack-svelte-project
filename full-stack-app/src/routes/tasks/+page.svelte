<script>
  import { onMount } from "svelte";

  let activePage = "tasks";
  let tasks = [];
  let newTask = "";

  async function loadTasks() {
    const res = await fetch(`/api/tasks`);
    tasks = await res.json();
  }

  async function addTask() {
    if (!newTask.trim()) return;
    await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTask })
    });
    newTask = "";
    loadTasks();
  }

  async function deleteTask(id) {
    await fetch(`/api/tasks/${id}`, { method: "DELETE" });
    loadTasks();
  }

  onMount(() => {
    loadTasks();
  });
</script>

<style>
  .main {
    padding: 2rem;
    background: #f9fafb;
    min-height: 100vh;
    font-family: "Inter", sans-serif;
  }

  .page-title {
    font-size: 2.25rem;
    font-weight: 700;
    color: #111827;
    margin-bottom: 1.5rem;
  }

  /* Input Card */
  .task-input-card {
    display: flex;
    gap: 0.75rem;
    margin-bottom: 2rem;
   
    padding: 1rem 1.25rem;
    border-radius: 0.75rem;
    
  }
  .task-input-card input {
    flex: 1;
    padding: 0.85rem 1rem;
    border: 1px solid #cbd5e1;
    border-radius: 0.5rem;
    font-size: 1rem;
    background: #fff;
    transition: border 0.2s, box-shadow 0.2s;
  }
  .task-input-card input:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37,99,235,0.2);
  }
  .task-input-card button {
    background: #2563eb;
    color: white;
    padding: 0.85rem 1.5rem;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    font-weight: 600;
    transition: background 0.3s;
  }
  .task-input-card button:hover {
    background: #1d4ed8;
  }

  /* Task Grid */
  .task-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* 3 per row */
    gap: 1.25rem;
  }

  .task-card {
    background: white;
    padding: 1rem 1.25rem;
    border-radius: 0.75rem;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .task-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  }

  .task-title {
    font-size: 1rem;
    color: #1f2937;
    font-weight: 500;
  }

  .delete-btn {
    background: #ef4444;
    border: none;
    color: white;
    padding: 0.5rem 0.9rem;
    border-radius: 0.5rem;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 500;
    transition: background 0.2s, transform 0.2s;
  }

  .delete-btn:hover {
    background: #dc2626;
    transform: scale(1.05);
  }

  .empty-state {
    text-align: center;
    color: #6b7280;
    font-size: 1rem;
    margin-top: 2rem;
  }
</style>

<div class="main">
  {#if activePage === "tasks"}
    <h1 class="page-title">📋 My Tasks</h1>

    <!-- Input Card -->
    <div class="task-input-card">
      <input bind:value={newTask} placeholder="✨ Add a new task..." />
      <button on:click={addTask}>Add Task</button>
    </div>

    <!-- Task List -->
    {#if tasks.length > 0}
      <div class="task-grid">
        {#each tasks as task}
          <div class="task-card">
            <span class="task-title">{task.title} - {task.status}</span>
            <button class="delete-btn" on:click={() => deleteTask(task._id)}>Delete</button>
          </div>
        {/each}
      </div>
    {:else}
      <p class="empty-state">No tasks yet. Add one above ⬆️</p>
    {/if}
  {/if}
</div>
