<script>
  import "../app.css";
  import { page } from "$app/stores";
  $: currentPath = $page.url.pathname;
</script>

<style>
  .layout {
    display: flex;
    height: 100vh;
    background: white;
    font-family: system-ui, -apple-system, sans-serif;
  }

  /* Sidebar */
  .sidebar {
    width: 260px;
    background: linear-gradient(180deg, #1e293b, #0f172a);
    color: #f1f5f9;
    display: flex;
    flex-direction: column;
    padding: 1.5rem 1rem;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.15);
  }

  .sidebar h2 {
    font-size: 1.4rem;
    font-weight: 700;
    margin-bottom: 2rem;
    text-align: center;
    letter-spacing: -0.5px;
    color: #e2e8f0;
  }

  /* Navigation */
  .nav {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    flex: 1;
  }

  .nav-link {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    border-radius: 0.6rem;
    font-size: 0.95rem;
    font-weight: 500;
    color: #cbd5e1;
    transition: all 0.3s ease;
    text-decoration: none;
  }

  .nav-link:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #f8fafc;
    transform: translateX(4px);
  }

  .active {
    background: #2563eb;
    color: #fff !important;
    box-shadow: 0 2px 6px rgba(37, 99, 235, 0.4);
  }

  /* Footer */
  .sidebar-footer {
    font-size: 0.8rem;
    color: #94a3b8;
    text-align: center;
    padding-top: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  /* Content wrapper */
  .content {
    flex: 1;
    background: #f9fafb;
    overflow-y: auto;
    display: flex;
    justify-content: center;
  }

  /* Page wrapper ensures consistent spacing */
  .page-wrapper {
    width: 100%;
    max-width: 1200px;
    padding: 2rem;
    box-sizing: border-box;
  }

  /* Reset margins from child pages (like h1, p, ul etc.) */
  .page-wrapper > :global(*) {
    margin-top: 0;
    margin-bottom: 1rem;
  }
  .icon-img{
    width:40px;
    height:30px;
    margin:5px;
  }
  .nav-icon{
    display:flex;
    margin-top:5px;
  }
</style>

<div class="layout">
  <!-- Sidebar -->
  <div class="sidebar">
    <a href="/">
      <div class="nav-icon">
        <img src="./dashboard.png" class="icon-img" />
         <h2>  My Dashboard </h2>
      </div>
    </a>
    <nav class="nav">
      <a href="/tasks" class="nav-link {currentPath === '/tasks' ? 'active' : ''}">📝 Tasks</a>
      <a href="/projects" class="nav-link {currentPath === '/projects' ? 'active' : ''}">📂 Projects</a>
      </nav>

    <div class="sidebar-footer">
      © 2025 MyApp
    </div>
  </div>

  <!-- Page Content -->
  <div class="content">
    <div class="page-wrapper">
      <slot />
    </div>
  </div>
</div>
