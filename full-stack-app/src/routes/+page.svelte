<script>
  import { onMount } from "svelte";
  import Chart from "chart.js/auto";

  let tasks = [];
  let projects = [];

  let completedTasks = [];
  let inProgressTasks = [];
  let pendingTasks = [];

  let taskChartCanvas;
  let projectChartCanvas;
  let taskChartInstance;
  let projectChartInstance;

  async function loadTasks() {
    const res = await fetch(`/api/tasks`);
    tasks = await res.json();

    // ✅ Filter tasks by status
    completedTasks = tasks.filter((t) => t.status === "completed");
    inProgressTasks = tasks.filter((t) => t.status === "in-progress");
    pendingTasks = tasks.filter((t) => t.status === "pending");

    drawTaskChart();
  }

  async function loadProjects() {
    const res = await fetch(`/api/projects`);
    projects = await res.json();

    drawProjectChart();
  }

  function drawTaskChart() {
    if (taskChartInstance) taskChartInstance.destroy();

    taskChartInstance = new Chart(taskChartCanvas, {
      type: "doughnut",
      data: {
        labels: ["Completed", "In Progress", "Pending"],
        datasets: [
          {
            data: [completedTasks.length, inProgressTasks.length, pendingTasks.length],
            backgroundColor: ["#22c55e", "#3b82f6", "#facc15"], // green, blue, yellow
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: "bottom" },
        },
      },
    });
  }

  function drawProjectChart() {
    if (projectChartInstance) projectChartInstance.destroy();

    // ✅ Group projects by creation date
    const projectCounts = {};
    projects.forEach((p) => {
      const date = new Date(p.createdAt).toLocaleDateString("en-GB"); // dd/mm/yyyy
      projectCounts[date] = (projectCounts[date] || 0) + 1;
    });

    const labels = Object.keys(projectCounts);
    const counts = Object.values(projectCounts);

    projectChartInstance = new Chart(projectChartCanvas, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Projects Created",
            data: counts,
            backgroundColor: "#64F9FA",
            borderRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
        },
        scales: {
          x: { title: { display: true, text: "Date" } },
          y: { beginAtZero: true, title: { display: true, text: "Projects" } },
        },
      },
    });
  }

  onMount(() => {
    loadTasks();
    loadProjects();
  });
</script>

<style>
  .page-title {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 2rem;
    color: #1e293b;
  }
  .cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }
  .charts{
    display:flex;
    justify-content:space-around;
  }
  .card {
    background: white;
    padding: 1.5rem;
    border-radius: 1rem;
    box-shadow: 0 4px 10px rgba(0,0,0,0.08);
    transition: transform 0.25s ease, box-shadow 0.25s ease;
  }
  .card:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 14px rgba(0,0,0,0.12);
  }
  .card h3 {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
    
  }
  .card p {
    font-size: 1.1rem;
    
  }
  canvas {
    max-width: 100%;
    margin: 2rem auto;
    display: block;
  }
  .cp{
    background-color:#5ec65f;
    color:white;
  }
  .pd{
    background-color:#facc33;
    color:white;
  }
  .ip{
    background-color:#3b82f6;
    color:white;
  }
  .prs{
    background-color:#64F9FA;
  }
</style>

<h1 class="page-title">Welcome Back 👋</h1>

<!-- Dashboard Summary -->
<div class="cards">
  <div class="card prs">
    <h3>Active Projects</h3>
    <p>{projects.length}</p>
  </div>
  <div class="card">
    <h3>Total Tasks</h3>
    <p>{tasks.length}</p>
  </div>
</div>
<div class="cards">
  <div class="card cp">
    <h3>Completed Tasks</h3>
    <p>{completedTasks.length}</p>
  </div>
  <div class="card ip">
    <h3>In-Progress Tasks</h3>
    <p>{inProgressTasks.length}</p>
  </div>
  <div class="card pd">  
    <h3>Pending Tasks</h3>
    <p>{pendingTasks.length}</p>
  </div>
</div>

<div class="charts">
<!-- Task Status Chart -->
  <div>
    <h2>Task Status Overview</h2>
    <canvas bind:this={taskChartCanvas}></canvas>
  </div>
  <!-- Project Creation Chart -->
  <div>
    <h2>Projects Created Over Time</h2>
    <canvas bind:this={projectChartCanvas} width="450" height="300"></canvas>
  </div>
</div>
