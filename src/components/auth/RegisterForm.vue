<script setup lang="ts">
import { ref } from 'vue';
import { UserPlus, Mail, Phone, Lock, Eye, EyeOff } from 'lucide-vue-next';
import { AuthService } from '@/services/AuthService';

const emit = defineEmits<{
  (e: 'switchTab', tab: string): void;
  (e: 'registered'): void;
}>();

const name = ref('');
const email = ref('');
const phone = ref('');
const password = ref('');
const confirmPassword = ref('');
const errorMessage = ref('');
const successMessage = ref('');
const showPassword = ref(false);
const showConfirmPassword = ref(false);

function handleRegister(): void {
  errorMessage.value = '';
  successMessage.value = '';

  if (!name.value || !email.value || !phone.value || !password.value || !confirmPassword.value) {
    errorMessage.value = 'Por favor completa todos los campos.';
    return;
  }

  if (password.value.length < 8) {
    errorMessage.value = 'La contraseña debe tener al menos 8 caracteres.';
    return;
  }

  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Las contraseñas no coinciden.';
    return;
  }

  try {
    AuthService.registerClient({
      name: name.value,
      email: email.value,
      phone: phone.value,
      password: password.value,
    });

    successMessage.value = '¡Cuenta creada exitosamente! Ahora puedes iniciar sesión.';

    name.value = '';
    email.value = '';
    phone.value = '';
    password.value = '';
    confirmPassword.value = '';

    setTimeout(() => {
      emit('switchTab', 'login');
    }, 2000);
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Ocurrió un error al registrar.';
  }
}
</script>

<template>
  <div class="register-form">
    <h1 class="form-title">Crear cuenta</h1>
    <p class="form-subtitle">Regístrate para explorar y reservar restaurantes</p>

    <div v-if="errorMessage" class="form-error">
      {{ errorMessage }}
    </div>

    <div v-if="successMessage" class="form-success">
      {{ successMessage }}
    </div>

    <div class="form-group">
      <label class="form-label" for="register-name">NOMBRE COMPLETO</label>
      <div class="input-wrapper">
        <UserPlus class="input-icon" :size="18" />
        <input
          id="register-name"
          v-model="name"
          type="text"
          placeholder="María García"
          class="form-input"
        />
      </div>
    </div>

    <div class="form-group">
      <label class="form-label" for="register-email">CORREO ELECTRÓNICO</label>
      <div class="input-wrapper">
        <Mail class="input-icon" :size="18" />
        <input
          id="register-email"
          v-model="email"
          type="email"
          placeholder="maria@email.com"
          class="form-input"
        />
      </div>
    </div>

    <div class="form-group">
      <label class="form-label" for="register-phone">TELÉFONO</label>
      <div class="input-wrapper">
        <Phone class="input-icon" :size="18" />
        <input
          id="register-phone"
          v-model="phone"
          type="tel"
          placeholder="+57 300 000 0000"
          class="form-input"
        />
      </div>
    </div>

    <div class="form-group">
      <label class="form-label" for="register-password">CONTRASEÑA</label>
      <div class="input-wrapper">
        <Lock class="input-icon" :size="18" />
        <input
          id="register-password"
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          placeholder="Mínimo 8 caracteres"
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

    <div class="form-group">
      <label class="form-label" for="register-confirm-password">CONFIRMAR CONTRASEÑA</label>
      <div class="input-wrapper">
        <Lock class="input-icon" :size="18" />
        <input
          id="register-confirm-password"
          v-model="confirmPassword"
          :type="showConfirmPassword ? 'text' : 'password'"
          placeholder="Repite tu contraseña"
          class="form-input"
        />
        <button
          type="button"
          class="password-toggle"
          @click="showConfirmPassword = !showConfirmPassword"
        >
          <EyeOff v-if="showConfirmPassword" :size="18" />
          <Eye v-else :size="18" />
        </button>
      </div>
    </div>

    <button class="btn btn--orange" @click="handleRegister">
      Crear cuenta
    </button>
  </div>
</template>

<style scoped>
.register-form {
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

.form-success {
  background: #F0FDF4;
  border: 1px solid #BBF7D0;
  color: #166534;
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

.btn {
  width: 100%;
  padding: 14px;
  border: none;
  border-radius: var(--radius-full);
  font-size: 15px;
  font-weight: 600;
  color: var(--color-white);
  transition: all var(--transition-normal);
  margin-top: var(--space-sm);
}

.btn--orange {
  background: var(--color-orange);
}

.btn--orange:hover {
  background: var(--color-orange-hover);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(196, 114, 58, 0.3);
}
</style>
