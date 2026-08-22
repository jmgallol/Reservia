<script setup lang="ts">
import { ref } from 'vue';
import { Info, User, Mail, Phone, Lock, Eye, EyeOff, ArrowRight } from 'lucide-vue-next';
import { AuthService } from '@/services/AuthService';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

const name = ref('');
const email = ref('');
const phone = ref('');
const password = ref('');
const restaurantName = ref('');
const restaurantAddress = ref('');
const restaurantCity = ref('Bogotá');
const restaurantCategory = ref('Italiana');
const errorMessage = ref('');
const successMessage = ref('');
const showPassword = ref(false);

const cities: string[] = [
  'Bogotá',
  'Medellín',
  'Cali',
  'Barranquilla',
  'Cartagena',
  'Bucaramanga',
  'Santa Marta',
  'Pereira',
];

const categories: string[] = [
  'Italiana',
  'Mexicana',
  'Japonesa',
  'Colombiana',
  'Francesa',
  'Peruana',
  'China',
  'Americana',
  'Mediterránea',
  'Fusión',
];

function handleRegister(): void {
  errorMessage.value = '';
  successMessage.value = '';

  if (
    !name.value ||
    !email.value ||
    !phone.value ||
    !password.value ||
    !restaurantName.value ||
    !restaurantAddress.value
  ) {
    errorMessage.value = 'Por favor completa todos los campos.';
    return;
  }

  if (password.value.length < 8) {
    errorMessage.value = 'La contraseña debe tener al menos 8 caracteres.';
    return;
  }

  try {
    const result = AuthService.registerAdmin({
      name: name.value,
      email: email.value,
      phone: phone.value,
      password: password.value,
      restaurantName: restaurantName.value,
      restaurantAddress: restaurantAddress.value,
      restaurantCity: restaurantCity.value,
      restaurantCategory: restaurantCategory.value,
    });

    authStore.login(result.user);
    successMessage.value = '¡Registro exitoso! Redirigiendo...';
    alert(`¡Bienvenido, ${result.user.name}! Tu restaurante "${result.restaurant.name}" ha sido registrado.`);
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Ocurrió un error al registrar.';
  }
}
</script>

<template>
  <div class="admin-form">
    <h1 class="form-title">Registro de administrador</h1>
    <p class="form-subtitle">Crea tu cuenta y asocia tu restaurante</p>

    <div class="info-alert">
      <Info class="info-alert__icon" :size="20" />
      <p class="info-alert__text">
        Cada administrador solo puede gestionar <strong>un único restaurante</strong>.
        Durante el registro deberás crear o asociar tu establecimiento.
      </p>
    </div>

    <div v-if="errorMessage" class="form-error">
      {{ errorMessage }}
    </div>

    <div v-if="successMessage" class="form-success">
      {{ successMessage }}
    </div>

    <!-- Datos del administrador -->
    <h2 class="section-title">DATOS DEL ADMINISTRADOR</h2>

    <div class="form-group">
      <label class="form-label" for="admin-name">NOMBRE COMPLETO</label>
      <div class="input-wrapper">
        <User class="input-icon" :size="18" />
        <input
          id="admin-name"
          v-model="name"
          type="text"
          placeholder="Juan Pérez"
          class="form-input"
        />
      </div>
    </div>

    <div class="form-group">
      <label class="form-label" for="admin-email">CORREO</label>
      <div class="input-wrapper">
        <Mail class="input-icon" :size="18" />
        <input
          id="admin-email"
          v-model="email"
          type="email"
          placeholder="juan@restaurante.co"
          class="form-input"
        />
      </div>
    </div>

    <div class="form-group">
      <label class="form-label" for="admin-phone">TELÉFONO</label>
      <div class="input-wrapper">
        <Phone class="input-icon" :size="18" />
        <input
          id="admin-phone"
          v-model="phone"
          type="tel"
          placeholder="+57 300 000 0000"
          class="form-input"
        />
      </div>
    </div>

    <div class="form-group">
      <label class="form-label" for="admin-password">CONTRASEÑA</label>
      <div class="input-wrapper">
        <Lock class="input-icon" :size="18" />
        <input
          id="admin-password"
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

    <!-- Datos del restaurante -->
    <h2 class="section-title">DATOS DEL RESTAURANTE</h2>

    <div class="form-group">
      <label class="form-label" for="admin-restaurant-name">NOMBRE DEL RESTAURANTE</label>
      <input
        id="admin-restaurant-name"
        v-model="restaurantName"
        type="text"
        placeholder="Ej: La Toscana"
        class="form-input form-input--no-icon"
      />
    </div>

    <div class="form-group">
      <label class="form-label" for="admin-restaurant-address">DIRECCIÓN</label>
      <input
        id="admin-restaurant-address"
        v-model="restaurantAddress"
        type="text"
        placeholder="Ej: Cra 7 #67-29"
        class="form-input form-input--no-icon"
      />
    </div>

    <div class="form-row-split">
      <div class="form-group">
        <label class="form-label" for="admin-restaurant-city">CIUDAD</label>
        <select
          id="admin-restaurant-city"
          v-model="restaurantCity"
          class="form-select"
        >
          <option v-for="city in cities" :key="city" :value="city">
            {{ city }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label class="form-label" for="admin-restaurant-category">CATEGORÍA</label>
        <select
          id="admin-restaurant-category"
          v-model="restaurantCategory"
          class="form-select"
        >
          <option v-for="cat in categories" :key="cat" :value="cat">
            {{ cat }}
          </option>
        </select>
      </div>
    </div>

    <button class="btn btn--orange" @click="handleRegister">
      <span>Continuar configuración</span>
      <ArrowRight :size="18" />
    </button>
  </div>
</template>

<style scoped>
.admin-form {
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
  margin-bottom: var(--space-md);
}

.info-alert {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  background: var(--color-alert-bg);
  border: 1px solid var(--color-alert-border);
  border-radius: var(--radius-md);
  padding: 14px 16px;
  margin-bottom: var(--space-lg);
}

.info-alert__icon {
  color: var(--color-gold);
  flex-shrink: 0;
  margin-top: 1px;
}

.info-alert__text {
  font-size: 13px;
  color: var(--color-alert-text);
  line-height: 1.5;
}

.info-alert__text strong {
  text-decoration: underline;
  font-weight: 700;
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

.section-title {
  font-family: var(--font-body);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.5px;
  color: var(--color-text-primary);
  margin-bottom: var(--space-md);
  margin-top: var(--space-sm);
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

.form-input--no-icon {
  padding-left: 14px;
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

.form-row-split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-md);
}

.form-select {
  width: 100%;
  padding: 14px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: 14px;
  color: var(--color-text-primary);
  background: var(--color-white);
  transition: border-color var(--transition-fast);
  outline: none;
  cursor: pointer;
  appearance: auto;
}

.form-select:focus {
  border-color: var(--color-border-focus);
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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
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
