<template>
  <header class="border-bottom bg-body-tertiary shadow-sm">
    <div
      class="container d-flex flex-wrap align-items-center justify-content-between gap-3 py-3"
    >
      <NuxtLink
        class="navbar-brand mb-0 text-decoration-none d-flex align-items-center gap-2"
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
        <ul class="nav mb-0">
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
</template>
