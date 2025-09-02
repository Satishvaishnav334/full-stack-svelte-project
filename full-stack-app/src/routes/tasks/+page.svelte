<script>
  import { onMount } from "svelte";

  let activePage = "tasks"; // default view
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
    await fetch(`/api/tasks/${id}`, {
      method: "DELETE"
    });
    loadTasks();
  }
  onMount(() => {
    loadTasks();
  });
</script>

<style>
  /* Layout */
  .main {
    flex: 1;
    padding: 2rem;
    overflow-y: auto;
    background: #f8fafc;
    min-height: 100vh;
  }

  

  /* Page Title */
  .page-title {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: #1e293b;
    animation: fadeInDown 0.6s ease;
  }

  /* Task Input */
  .task-input {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
  .task-input input {
    flex: 1;
    padding: 0.75rem;
    border: 1px solid #cbd5e1;
    border-radius: 0.5rem;
  }
  .task-input button {
    background: #2563eb;
    color: white;
    padding: 0.75rem 1.25rem;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: background 0.3s;
  }
  .task-input button:hover {
    background: #1d4ed8;
  }

  /* Task List */
  .task-list {
    list-style: none;
    padding: 0;
  }
  .task-item {
     display:flex;
    justify-content:space-between;
    background: white;
    margin-bottom: 0.5rem;
    padding: 1rem;
    border-radius: 0.5rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    transition: transform 0.2s;
  }
  .task-item:hover {
    transform: translateY(-2px);
  }
 .delete-btn {
    background: #ef4444;
    border: none;
    color: white;
    padding: 0.5rem 0.75rem;
    border-radius: 0.375rem;
    cursor: pointer;
    transition: background 0.2s;
  }
  .delete-btn:hover {
    background: #dc2626;
  }
  /* Animations */
  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translateY(-12px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>

<!-- Main Content -->
<div class="main">


  {#if activePage === "tasks"}
    <h1 class="page-title">Tasks</h1>
    <div class="task-input">
      <input bind:value={newTask} placeholder="Enter a new task..." />
      <button on:click={addTask}>Add</button>
    </div>
    <ul class="task-list">
      {#each tasks as task}
        <li class="task-item">
        <span>{task.title} - {task.status}</span>
        <button class="delete-btn" on:click={() => deleteTask(task._id)}>Delete</button>
        </li>        
      {/each}
    </ul>
  {/if}

  {#if activePage === "projects"}
    <h1 class="page-title">Projects</h1>
    <p style="color:#475569;">
      Here you can manage your projects. (Extend this section later.)
    </p>
  {/if}
</div>
