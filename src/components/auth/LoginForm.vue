<script setup lang="ts">
import { ref } from 'vue';
import { Mail, Lock, Eye, EyeOff } from 'lucide-vue-next';
import { AuthService } from '@/services/AuthService';
import { useAuthStore } from '@/stores/auth';

const emit = defineEmits<{
  (e: 'switchTab', tab: string): void;
}>();

const authStore = useAuthStore();

const email = ref('');
const password = ref('');
const rememberMe = ref(false);
const errorMessage = ref('');
const showPassword = ref(false);

function handleLogin(): void {
  errorMessage.value = '';

  if (!email.value || !password.value) {
    errorMessage.value = 'Por favor completa todos los campos.';
    return;
  }

  const user = AuthService.login(email.value, password.value);

  if (!user) {
    errorMessage.value = 'Correo o contraseña incorrectos.';
    return;
  }

  authStore.login(user);
  alert(`¡Bienvenido, ${user.name}!`);
}
</script>

<template>
  <div class="login-form">
    <h1 class="form-title">Bienvenido de nuevo</h1>
    <p class="form-subtitle">Ingresa tus credenciales para continuar</p>

    <div v-if="errorMessage" class="form-error">
      {{ errorMessage }}
    </div>

    <div class="form-group">
      <label class="form-label" for="login-email">CORREO ELECTRÓNICO</label>
      <div class="input-wrapper">
        <Mail class="input-icon" :size="18" />
        <input
          id="login-email"
          v-model="email"
          type="email"
          placeholder="maria@email.com"
          class="form-input"
        />
      </div>
    </div>

    <div class="form-group">
      <label class="form-label" for="login-password">CONTRASEÑA</label>
      <div class="input-wrapper">
        <Lock class="input-icon" :size="18" />
        <input
          id="login-password"
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          placeholder="••••••••"
          class="form-input"
        />
        <button
          type="button"
          class="password-toggle"
          @click="showPassword = !showPassword"
        >
          <EyeOff v-if="showPassword" :size="18" />
          <Eye v-else :size="18" />
        </button>
      </div>
    </div>

    <div class="form-row">
      <label class="checkbox-label">
        <input v-model="rememberMe" type="checkbox" class="checkbox-input" />
        <span class="checkbox-custom"></span>
        Recordarme
      </label>
      <a href="#" class="forgot-link">¿Olvidaste tu contraseña?</a>
    </div>

    <button class="btn btn--green" @click="handleLogin">
      Iniciar sesión
    </button>

    <button class="admin-link" @click="emit('switchTab', 'admin')">
      — Ingresar como administrador —
    </button>
  </div>
</template>

<style scoped>
.login-form {
  display: flex;
  flex-direction: column;
}

.form-title {
  font-family: var(--font-heading);
  font-size: 28px;
  font-weight: 700;
  font-style: italic;
  color: var(--color-text-primary);
  margin-bottom: 6px;
}

.form-subtitle {
  color: var(--color-text-secondary);
  font-size: 14px;
  margin-bottom: var(--space-lg);
}

.form-error {
  background: #FEF2F2;
  border: 1px solid #FECACA;
  color: #991B1B;
  padding: 10px 14px;
  border-radius: var(--radius-sm);
  font-size: 13px;
  margin-bottom: var(--space-md);
}

.form-group {
  margin-bottom: var(--space-md);
}

.form-label {
  display: block;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.5px;
  color: var(--color-text-label);
  margin-bottom: 6px;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 14px;
  color: var(--color-text-secondary);
  pointer-events: none;
  opacity: 0.6;
}

.form-input {
  width: 100%;
  padding: 14px 14px 14px 44px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: 14px;
  color: var(--color-text-primary);
  background: var(--color-white);
  transition: border-color var(--transition-fast);
  outline: none;
}

.form-input::placeholder {
  color: var(--color-text-placeholder);
}

.form-input:focus {
  border-color: var(--color-border-focus);
}

.password-toggle {
  position: absolute;
  right: 14px;
  background: none;
  border: none;
  color: var(--color-text-secondary);
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.6;
  cursor: pointer;
  transition: opacity var(--transition-fast);
}

.password-toggle:hover {
  opacity: 1;
}

.form-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-lg);
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--color-text-secondary);
  cursor: pointer;
}

.checkbox-input {
  width: 16px;
  height: 16px;
  accent-color: var(--color-green-dark);
  cursor: pointer;
}

.checkbox-custom {
  display: none;
}

.forgot-link {
  font-size: 13px;
  color: var(--color-orange);
  font-weight: 500;
  transition: color var(--transition-fast);
}

.forgot-link:hover {
  color: var(--color-orange-hover);
}

.btn {
  width: 100%;
  padding: 14px;
  border: none;
  border-radius: var(--radius-full);
  font-size: 15px;
  font-weight: 600;
  color: var(--color-white);
  transition: all var(--transition-normal);
  margin-bottom: var(--space-md);
}

.btn--green {
  background: var(--color-green-dark);
}

.btn--green:hover {
  background: var(--color-green-medium);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(45, 90, 61, 0.3);
}

.admin-link {
  display: block;
  text-align: center;
  font-size: 13px;
  color: var(--color-text-secondary);
  background: none;
  border: none;
  margin-top: var(--space-sm);
  cursor: pointer;
  transition: color var(--transition-fast);
}

.admin-link:hover {
  color: var(--color-green-dark);
}
</style>
