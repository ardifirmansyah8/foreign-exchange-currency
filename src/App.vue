<template>
  <div id='app'>
    <el-row :gutter='20' type='flex'>
      <el-col :span='8' :offset='8'>
        <el-card class='box-card'>
          <amount @setAmount='setAmount'/>

          <hr class='divider'/>

          <template v-for='(item, index) in selectedCurrency'>
            <currency
              :key='index'
              :data='item'
              :index='index'
              :amount='amount'
              :remove='removeCurrency'
              :round='roundNum'
            />
          </template>

          <add-currency :selectedCurrency='selectedCurrency' @addCurrency='addCurrency'/>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
/* eslint-disable no-console */

import axios from 'axios';

import Amount from './components/Amount.vue';
import Currency from './components/Currency.vue';
import AddCurrency from './components/AddCurrency.vue';

export default {
  name: 'app',
  components: {
    Amount,
    Currency,
    AddCurrency,
  },
  data() {
    return {
      amount: '0',
      selectedCurrency: [],
      rates: {},
    };
  },
  mounted() {
    this.getCurrency();
  },
  methods: {
    roundNum(num) {
      return +(`${Math.round(`${num}e+2`)}e-2`);
    },
    setAmount(val) {
      this.amount = val.replace(/(\d+).(?=\d{3}(\D|$))/g, '$1');
    },
    async getCurrency() {
      const { data: { rates } } = await axios.get('https://api.exchangeratesapi.io/latest?base=USD');
      this.rates = rates;
    },
    addCurrency(currency) {
      this.selectedCurrency.push({
        currency: currency.label,
        detail: currency.detail,
        value: this.roundNum(this.rates[currency.label]),
      });
    },
    removeCurrency(index) {
      this.selectedCurrency.splice(index, 1);
    },
  },
};
</script>
