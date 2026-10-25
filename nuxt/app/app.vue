<template>
  <div
    style="
      --bs-primary: #1a3d2b;
      --bs-primary-rgb: 26, 61, 43;
      --bs-primary-bg-subtle: #e4efe8;
      --bs-primary-border-subtle: #b7d3c3;
      --bs-link-color: #1a3d2b;
      --bs-link-color-rgb: 26, 61, 43;
      --bs-link-hover-color: #234e38;
      --bs-link-hover-color-rgb: 35, 78, 56;
    "
  >
  <header class="text-bg-primary shadow-sm sticky-top" data-bs-theme="dark">
    <div
      class="container d-flex flex-wrap align-items-center justify-content-between gap-3 py-3"
    >
      <NuxtLink
        class="navbar-brand mb-0 text-white text-decoration-none d-flex align-items-center gap-2"
        to="/"
      >
        <img
          src="~/assets/images/logo.png"
          alt="Reservia"
          height="32"
          class="d-inline-block align-text-top"
        />
        <span>Reservia</span>
      </NuxtLink>

      <nav aria-label="Principal">
        <ul
          class="nav nav-pills mb-0"
          style="
            --bs-nav-link-color: #fff;
            --bs-nav-link-hover-color: #e8a020;
            --bs-nav-pills-link-active-bg: #e8a020;
            --bs-nav-pills-link-active-color: #1a3d2b;
          "
        >
          <li class="nav-item">
            <NuxtLink class="nav-link py-1 px-2" to="/" active-class="active">Inicio</NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink class="nav-link py-1 px-2" to="/restaurants" active-class="active">
              Restaurantes
            </NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink class="nav-link py-1 px-2" to="/blog" active-class="active">Blog</NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink class="nav-link py-1 px-2" to="/tools" active-class="active">
              Herramientas
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>

  <div class="container my-4">
    <NuxtPage />
  </div>
  </div>
</template>
