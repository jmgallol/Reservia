<script setup lang="ts">
// Imports
import { RouterLink } from 'vue-router';

import { Facebook, Instagram, Mail, MapPin, Phone, Twitter } from 'lucide-vue-next';

// Variables
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="bg-[#122318] text-stone-300 pt-16 pb-12 border-t border-stone-800">
    <div class="max-w-6xl mx-auto px-6">
      <!-- Main Footer Content -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        <!-- Brand & Info -->
        <div class="space-y-4">
          <RouterLink to="/" class="flex items-center gap-2 no-underline">
            <span class="text-2xl font-bold tracking-tight text-white font-heading">
              <span class="text-white">Reserv</span><span class="text-[#E8A020]">ia</span>
            </span>
          </RouterLink>
          <p class="text-sm text-stone-400 leading-relaxed">
            Tu plataforma de descubrimiento gastronómico y reservas inteligentes en los mejores
            restaurantes del país.
          </p>
          <!-- Social Icons -->
          <div class="flex items-center gap-3 pt-2">
            <a
              href="#"
              aria-label="Instagram"
              class="w-9 h-9 rounded-full bg-white/5 hover:bg-[#C8552A] text-stone-300 hover:text-white flex items-center justify-center transition-colors"
            >
              <Instagram class="w-4 h-4" />
            </a>
            <a
              href="#"
              aria-label="Facebook"
              class="w-9 h-9 rounded-full bg-white/5 hover:bg-[#C8552A] text-stone-300 hover:text-white flex items-center justify-center transition-colors"
            >
              <Facebook class="w-4 h-4" />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              class="w-9 h-9 rounded-full bg-white/5 hover:bg-[#C8552A] text-stone-300 hover:text-white flex items-center justify-center transition-colors"
            >
              <Twitter class="w-4 h-4" />
            </a>
          </div>
        </div>

        <!-- Navigation Links -->
        <div>
          <h4 class="text-white font-semibold text-sm uppercase tracking-wider mb-4">Explorar</h4>
          <ul class="space-y-2.5 text-sm">
            <li>
              <RouterLink
                to="/"
                class="hover:text-white transition-colors text-stone-400 hover:translate-x-1 inline-block"
              >
                Inicio
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/restaurants"
                class="hover:text-white transition-colors text-stone-400 hover:translate-x-1 inline-block"
              >
                Restaurantes
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/about"
                class="hover:text-white transition-colors text-stone-400 hover:translate-x-1 inline-block"
              >
                Acerca de nosotros
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/auth"
                class="hover:text-white transition-colors text-stone-400 hover:translate-x-1 inline-block"
              >
                Iniciar sesión / Registro
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Categorías Populares -->
        <div>
          <h4 class="text-white font-semibold text-sm uppercase tracking-wider mb-4">Categorías</h4>
          <ul class="space-y-2.5 text-sm">
            <li>
              <RouterLink
                :to="{ name: 'restaurants', query: { category: 'Italiana' } }"
                class="hover:text-white transition-colors text-stone-400 hover:translate-x-1 inline-block"
              >
                Comida Italiana
              </RouterLink>
            </li>
            <li>
              <RouterLink
                :to="{ name: 'restaurants', query: { category: 'Mexicana' } }"
                class="hover:text-white transition-colors text-stone-400 hover:translate-x-1 inline-block"
              >
                Comida Mexicana
              </RouterLink>
            </li>
            <li>
              <RouterLink
                :to="{ name: 'restaurants', query: { category: 'Japonesa' } }"
                class="hover:text-white transition-colors text-stone-400 hover:translate-x-1 inline-block"
              >
                Sushi & Japonesa
              </RouterLink>
            </li>
            <li>
              <RouterLink
                :to="{ name: 'restaurants', query: { category: 'Colombiana' } }"
                class="hover:text-white transition-colors text-stone-400 hover:translate-x-1 inline-block"
              >
                Tradicional Colombiana
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Contact & GastroFinder Info -->
        <div>
          <h4 class="text-white font-semibold text-sm uppercase tracking-wider mb-4">Contacto</h4>
          <ul class="space-y-3 text-sm text-stone-400">
            <li class="flex items-start gap-2.5">
              <MapPin class="w-4 h-4 text-[#C8552A] shrink-0 mt-0.5" />
              <span>Medellín, Colombia</span>
            </li>
            <li class="flex items-center gap-2.5">
              <Phone class="w-4 h-4 text-[#C8552A] shrink-0" />
              <span>+57 (601) 789 0123</span>
            </li>
            <li class="flex items-center gap-2.5">
              <Mail class="w-4 h-4 text-[#C8552A] shrink-0" />
              <span>contacto@reservia.co</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom bar -->
      <div
        class="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-500"
      >
        <p>© {{ currentYear }} Reservia.</p>
        <div class="flex items-center gap-6">
          <a href="#" class="hover:text-stone-300 transition-colors">Términos de servicio</a>
          <a href="#" class="hover:text-stone-300 transition-colors">Política de privacidad</a>
          <a href="#" class="hover:text-stone-300 transition-colors">Cookies</a>
        </div>
      </div>
    </div>
  </footer>
</template>
