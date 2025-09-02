<h1 class="page-title">Welcome Back 👋</h1>

<div class="cards">
  <div class="card">
    <h3>Total Tasks</h3>
    <p>128</p>
  </div>
  <div class="card">
    <h3>Active Projects</h3>
    <p>6</p>
  </div>
  <div class="card">
    <h3>Completed Tasks</h3>
    <p>94</p>
  </div>
  <div class="card">
    <h3>Team Members</h3>
    <p>12</p>
  </div>
</div>

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
    color: #1e40af;
  }
  .card p {
    font-size: 1.1rem;
    color: #475569;
  }
</style>
