<template>
  <div id="app">
    <el-row :gutter="20" type="flex">
      <el-col :span="8" :offset="8">
        <el-card class="box-card">
          <el-form label-width="50px">
            <h4><i>USD - United States Dollars</i></h4>
            <el-form-item class="amount" label="USD">
              <el-input
                placeholder="Please input amount"
                v-model="amount"
                :clearable="true"
                @keypress.native="isNumber"
              />
            </el-form-item>
          </el-form>

          <hr class="divider"/>

          <el-card v-for="(item, index) in selectedCurrency" shadow="never" class="mb-20" :key="index">
            <el-row :gutter="20" type="flex" align="middle">
              <el-col :span="20">
                <div>
                  <el-row :gutter="20" type="flex" justify="space-between">
                    <el-col :span="4">
                      <label class="text-20 bold">{{ item.currency }}</label>
                    </el-col>
                    <el-col :span="20" class="right">
                      <label class="text-20 bold">{{ getRate(amount, item.value).toLocaleString('US') }}</label>
                    </el-col>
                  </el-row>
                  <h5 class="mt-10 mb-10"><i>{{ `${item.currency} - ${item.detail}` }}</i></h5>
                  <label class="text-12">
                    <i>1 USD = {{ item.currency }} <span>{{ item.value.toLocaleString('US') }}</span></i>
                  </label>
                </div>
              </el-col>

              <el-col :span="4">
                <div class="center">
                  <i class="el-icon-delete" @click="removeCurrency(index)"></i>
                </div>
              </el-col>
            </el-row>
          </el-card>

          <el-row :gutter="20" type="flex" align="middle">
            <el-col :span="16">
              <el-select v-model="currency" placeholder="Add More Currencies" class="fluid">
                <el-option
                  v-for="item in currencies"
                  :key="item.value"
                  :label="item.label"
                  :value="item"
                  :disabled="setDisabledOption(item.label)"
                >
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="8">
              <el-button type="primary" class="fluid" @click="addCurrency">Submit</el-button>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
/* eslint-disable no-console */

import axios from 'axios';

export default {
  name: 'app',
  data() {
    return {
      amount: '0',
      currencies: [
        {
          value: 'USD',
          label: 'USD',
          detail: 'United States Dollars'
        },
        {
          value: 'CAD',
          label: 'CAD',
          detail: 'Canadian Dollars'
        },
        {
          value: 'IDR',
          label: 'IDR',
          detail: 'Indonesian Rupiah'
        },
        {
          value: 'GBP',
          label: 'GBP',
          detail: 'British Pounds'
        },
        {
          value: 'SGD',
          label: 'SGD',
          detail: 'Singapore Dollars'
        },
        {
          value: 'INR',
          label: 'INR',
          detail: 'Indian Rupees'
        },
        {
          value: 'MYR',
          label: 'MYR',
          detail: 'Malaysian Ringgits'
        },
        {
          value: 'JPY',
          label: 'JPY',
          detail: 'Japanese Yen'
        },
        {
          value: 'KRW',
          label: 'KRW',
          detail: 'South Korean Won'
        }
      ],
      currency: '',
      selectedCurrency: [],
      rates: {}
    };
  },
  watch: {
    amount: function (val) {
      if (val) {
        const result = val.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        this.$nextTick(() => {
          this.amount = result;
        });
      }
    },
  },
  mounted() {
    this.amount = '10000';
    this.getCurrency();
  },
  methods: {
    isNumber (evt) {
      let charCode = (evt.which) ? evt.which : evt.keyCode
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
          evt.preventDefault()
      } else {
          return true
      }
    },
    roundNum(num) {
        return +(Math.round(num + "e+2")  + "e-2");
    },
    convertAmountToNumber(val) {
      return val.replace(/(\d+).(?=\d{3}(\D|$))/g, '$1');
    },
    getRate(amount, rate) {
      return this.roundNum(this.convertAmountToNumber(amount) * rate);
    },
    getCurrency() {
      axios.get('https://api.exchangeratesapi.io/latest?base=USD')
        .then((response) => {
          const { data: { rates }} = response;
          this.rates = rates;
        })
        .catch((error) => {
          console.log(error);
        })
    },
    addCurrency() {
      this.selectedCurrency.push({
        currency: this.currency.label,
        detail: this.currency.detail,
        value: this.roundNum(this.rates[this.currency.label])
      });
      this.currency = '';
    },
    removeCurrency(index) {
      this.selectedCurrency.splice(index, 1);
    },
    setDisabledOption(option) {
      const checkOption = this.selectedCurrency.find(currency => currency.currency === option);
      return typeof checkOption !== 'undefined';
    }
  }
}
</script>