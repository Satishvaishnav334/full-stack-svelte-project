<script>
  import { onMount } from "svelte";

  let activePage = "projects"; // default view
  let projects = [];
  let newProject = "";

  async function loadProjects() {
    const res = await fetch(`/api/projects`);
    projects = await res.json();
  }

  async function addProject() {
    if (!newProject.trim()) return;
    await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newProject })
    });
    newProject = "";
    loadProjects();
  }

  async function deleteProject(id) {
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    loadProjects();
  }

  onMount(() => {
    loadProjects();
  });
</script>

<style>
  .main {
    flex: 1;
    padding: 2rem;
    overflow-y: auto;
    background: #f8fafc;
    min-height: 100vh;
  }

  /* Title */
  .page-title {
    font-size: 2.25rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: #0f172a;
    border-bottom: 3px solid #2563eb;
    display: inline-block;
    padding-bottom: 0.25rem;
  }

  /* Input */
  .project-input {
    display: flex;
    gap: 0.75rem;
    margin-bottom: 2rem;
  }
  .project-input input {
    flex: 1;
    padding: 0.85rem 1rem;
    border: 1px solid #cbd5e1;
    border-radius: 0.5rem;
    font-size: 1rem;
    background: #fff;
    transition: border 0.2s;
  }
  .project-input input:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37,99,235,0.2);
  }
  .project-input button {
    background: #2563eb;
    color: white;
    padding: 0.85rem 1.5rem;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    font-weight: 600;
    transition: background 0.3s;
  }
  .project-input button:hover {
    background: #1d4ed8;
  }

  /* Grid */
  .project-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.25rem;
  }

  /* Card */
  .project-card {
    background: white;
    padding: 1.25rem;
    border-radius: 0.75rem;
    box-shadow: 0 2px 6px rgba(0,0,0,0.08);
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .project-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  }

  .delete-btn {
    background: #ef4444;
    border: none;
    color: white;
    padding: 0.6rem 0.9rem;
    border-radius: 0.5rem;
    cursor: pointer;
    font-weight: 500;
    transition: background 0.2s;
  }
  .delete-btn:hover {
    background: #dc2626;
  }
</style>

<div class="main">
  {#if activePage === "projects"}
    <h1 class="page-title">Projects</h1>

    <div class="project-input">
      <input bind:value={newProject} placeholder="Enter a new Project..." />
      <button on:click={addProject}>Add</button>
    </div>

    <div class="project-grid">
      {#each projects as project}
        <div class="project-card">
          <span>{project.name}</span>
          <button class="delete-btn" on:click={() => deleteProject(project._id)}>
            Delete
          </button>
        </div>
      {/each}
    </div>
  {/if}
</div>
