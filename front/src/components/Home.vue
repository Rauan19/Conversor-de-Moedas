<template>
    <div class="container">
      <h1 class="title">Conversor de Moedas</h1>
  
      <!-- Formulário de conversão -->
      <div class="converter-form">
        <div class="input-group">
          <label for="amount" class="label">Valor:</label>
          <input
            v-model="amount"
            id="amount"
            type="number"
            class="input"
            placeholder="Digite o valor"
            min="0"
          />
        </div>
  
        <div class="input-group">
          <label for="fromCurrency" class="label">De:</label>
          <select
            v-model="fromCurrency"
            id="fromCurrency"
            class="input"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="BRL">BRL</option>
            <option value="JPY">JPY</option>
            <!-- Adicione mais moedas conforme necessário -->
          </select>
        </div>
  
        <div class="input-group">
          <label for="toCurrency" class="label">Para:</label>
          <select
            v-model="toCurrency"
            id="toCurrency"
            class="input"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="BRL">BRL</option>
            <option value="JPY">JPY</option>
            <!-- Adicione mais moedas conforme necessário -->
          </select>
        </div>
  
        <button @click="convertCurrency" class="button">Converter</button>
      </div>
  
      <!-- Exibição do carregamento -->
      <div v-if="loading" class="loading">
        <p>Carregando...</p>
      </div>
  
      <!-- Exibição do resultado -->
      <div v-if="convertedAmount !== null && !loading" class="result">
        <p class="result-text">
          <strong>{{ amount }} {{ fromCurrency }} é igual a {{ convertedAmount }} {{ toCurrency }}</strong>
        </p>
      </div>
  
      <!-- Exibição de erro caso ocorra -->
      <div v-if="error && !loading" class="error">
        <p>Ocorreu um erro. Tente novamente mais tarde.</p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import axios from 'axios';
  
  // Variáveis para armazenar dados do usuário e resultados
  const amount = ref<number>(0);
  const fromCurrency = ref<string>('USD');
  const toCurrency = ref<string>('EUR');
  const convertedAmount = ref<number | null>(null);
  const error = ref<boolean>(false);
  const loading = ref<boolean>(false);
  
  // Função para realizar a conversão
  const convertCurrency = async () => {
    try {
      // Define o estado de carregamento
      loading.value = true;
      error.value = false;
      convertedAmount.value = null;
  
      // Verifica se o valor inserido é válido
      if (amount.value <= 0) {
        loading.value = false;
        return;
      }
  
      // URL da API para converter as moedas
      const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency.value}`);
      
      // Verificando a taxa de conversão e realizando o cálculo
      const rate = response.data.rates[toCurrency.value];
      convertedAmount.value = amount.value * rate;
      loading.value = false;
    } catch (err) {
      console.error('Erro na conversão:', err);
      convertedAmount.value = null;
      error.value = true;
      loading.value = false;
    }
  };
  </script>
  
  <style scoped>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f7fafc;
  }
  
  .title {
    font-size: 2rem;
    margin-bottom: 20px;
    color: #2d3748;
  }
  
  .converter-form {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    width: 300px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  
  .input-group {
    display: flex;
    flex-direction: column;
  }
  
  .label {
    font-size: 1rem;
    margin-bottom: 8px;
    color: #4a5568;
  }
  
  .input {
    padding: 8px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .button {
    padding: 10px;
    background-color: #4CAF50;
    color: white;
    font-size: 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .button:hover {
    background-color: #45a049;
  }
  
  .result {
    margin-top: 20px;
    font-size: 1.2rem;
  }
  
  .result-text {
    color: #2d3748;
    font-weight: bold;
  }
  
  .error {
    color: red;
    font-size: 1rem;
    margin-top: 20px;
  }
  
  .loading {
    margin-top: 20px;
    font-size: 1.2rem;
    color: #4CAF50;
  }
  </style>
  