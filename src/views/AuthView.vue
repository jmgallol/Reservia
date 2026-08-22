<script setup lang="ts">
import { ref } from 'vue';
import AuthTabs from '@/components/auth/AuthTabs.vue';
import LoginForm from '@/components/auth/LoginForm.vue';
import RegisterForm from '@/components/auth/RegisterForm.vue';
import AdminRegisterForm from '@/components/auth/AdminRegisterForm.vue';

const activeTab = ref('login');

function handleSwitchTab(tab: string): void {
  activeTab.value = tab;
}
</script>

<template>
  <div class="auth-page">
    <!-- Left panel: Form -->
    <div class="auth-page__form-panel">
      <div class="auth-page__form-content">
        <!-- Logo -->
        <div class="auth-page__logo">
          <div class="auth-page__logo-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" fill="currentColor"/>
            </svg>
          </div>
          <span class="auth-page__logo-text">Reservia</span>
        </div>

        <!-- Tabs -->
        <AuthTabs :active-tab="activeTab" @update:active-tab="handleSwitchTab" />

        <!-- Form panels -->
        <div class="auth-page__form-body">
          <LoginForm
            v-if="activeTab === 'login'"
            @switch-tab="handleSwitchTab"
          />
          <RegisterForm
            v-if="activeTab === 'register'"
            @switch-tab="handleSwitchTab"
          />
          <AdminRegisterForm
            v-if="activeTab === 'admin'"
          />
        </div>
      </div>
    </div>

    <!-- Right panel: Image -->
    <div class="auth-page__image-panel">
      <div class="auth-page__image-overlay">
        <div class="auth-page__image-text">
          <span class="auth-page__image-tagline">LA EXPERIENCIA TE ESPERA</span>
          <h2 class="auth-page__image-heading">
            Reserva tu mesa<br />en los mejores<br />restaurantes
          </h2>
          <div class="auth-page__image-dots">
            <span class="dot dot--green"></span>
            <span class="dot dot--orange"></span>
            <span class="dot dot--gold"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth-page {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
}

/* Left panel */
.auth-page__form-panel {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: var(--space-2xl) var(--space-xl);
  overflow-y: auto;
  background: var(--color-white);
}

.auth-page__form-content {
  width: 100%;
  max-width: 420px;
}

/* Logo */
.auth-page__logo {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: var(--space-xl);
}

.auth-page__logo-icon {
  width: 40px;
  height: 40px;
  background: var(--color-green-dark);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-white);
}

.auth-page__logo-text {
  font-family: var(--font-heading);
  font-size: 22px;
  font-weight: 700;
  color: var(--color-text-primary);
}

/* Form body spacing */
.auth-page__form-body {
  margin-top: var(--space-xl);
}

/* Right panel: Image */
.auth-page__image-panel {
  position: relative;
  background-image: url('@/assets/images/auth-restaurant.avif');
  background-size: cover;
  background-position: center;
  background-color: #3A3A3A;
}

.auth-page__image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.65) 0%,
    rgba(0, 0, 0, 0.2) 50%,
    rgba(0, 0, 0, 0.1) 100%
  );
  display: flex;
  align-items: flex-end;
  padding: var(--space-2xl);
}

.auth-page__image-text {
  color: var(--color-white);
}

.auth-page__image-tagline {
  display: block;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 2px;
  color: var(--color-gold);
  margin-bottom: var(--space-md);
}

.auth-page__image-heading {
  font-family: var(--font-heading);
  font-size: 38px;
  font-weight: 700;
  line-height: 1.15;
  color: var(--color-white);
  margin-bottom: var(--space-lg);
}

.auth-page__image-dots {
  display: flex;
  gap: 8px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.dot--green {
  background: var(--color-green-dark);
}

.dot--orange {
  background: var(--color-orange);
}

.dot--gold {
  background: var(--color-gold);
}

/* Responsive */
@media (max-width: 900px) {
  .auth-page {
    grid-template-columns: 1fr;
  }

  .auth-page__image-panel {
    display: none;
  }

  .auth-page__form-panel {
    padding: var(--space-lg) var(--space-md);
  }
}
</style>
