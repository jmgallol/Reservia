<script setup lang="ts">
// Imports
import { BillSplitUtil } from '~/utils/BillSplitUtil';
import { CurrencyFormatUtil } from '~/utils/CurrencyFormatUtil';

// Reactive variables
const billAmount = ref(0);
const tipPercentage = ref(10);
const people = ref(1);

// Computed
const isValid = computed(() => billAmount.value > 0 && people.value >= 1);

const billSplit = computed(() =>
  BillSplitUtil.calculate({
    billAmount: billAmount.value,
    tipPercentage: tipPercentage.value,
    people: people.value,
  }),
);

useSeoMeta({
  title: 'Calculadora de cuenta · Reservia',
  description: 'Calcula la propina y el valor que debe pagar cada comensal.',
});
</script>

<template>
  <section>
    <p class="mb-1">
      <NuxtLink class="text-decoration-none small" to="/tools">← Herramientas</NuxtLink>
    </p>

    <h1 class="h2 text-primary">Calculadora de cuenta</h1>
    <p class="text-body-secondary">Divide la cuenta del restaurante entre los comensales.</p>

    <!-- Formulario -->
    <form class="card card-body shadow-sm mb-4" @submit.prevent>
      <div class="mb-3">
        <label class="form-label" for="bill-amount">Valor de la cuenta (COP)</label>
        <input
          id="bill-amount"
          v-model.number="billAmount"
          class="form-control"
          type="number"
          min="0"
          step="1000"
        />
      </div>

      <div class="mb-3">
        <label class="form-label" for="tip-percentage">Propina (%)</label>
        <input
          id="tip-percentage"
          v-model.number="tipPercentage"
          class="form-control"
          type="number"
          min="0"
          max="100"
        />
      </div>

      <div class="mb-3">
        <label class="form-label" for="people">Número de personas</label>
        <input
          id="people"
          v-model.number="people"
          class="form-control"
          type="number"
          min="1"
          step="1"
        />
      </div>
    </form>

    <!-- Resultado -->
    <dl v-if="isValid" class="row card card-body shadow-sm border-primary bg-primary-subtle mx-0 mb-0">
      <dt class="col-6">Propina</dt>
      <dd class="col-6 text-end">{{ CurrencyFormatUtil.formatCop(billSplit.tipAmount) }}</dd>

      <dt class="col-6">Total con propina</dt>
      <dd class="col-6 text-end">{{ CurrencyFormatUtil.formatCop(billSplit.totalWithTip) }}</dd>

      <dt class="col-6">Por persona</dt>
      <dd class="col-6 text-end fw-bold text-primary fs-5">
        {{ CurrencyFormatUtil.formatCop(billSplit.amountPerPerson) }}
      </dd>
    </dl>
    <p v-else class="text-body-secondary">
      Ingresa el valor de la cuenta y al menos una persona para ver el resultado.
    </p>
  </section>
</template>
