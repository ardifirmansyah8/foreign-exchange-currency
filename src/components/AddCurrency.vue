<template>
  <div>
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
        <el-button type="primary" class="fluid" @click="add" :disabled="currency === ''">
          Submit
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'component-add-currency',
  props: {
    selectedCurrency: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      currencies: [
        {
          value: 'USD',
          label: 'USD',
          detail: 'United States Dollars',
        },
        {
          value: 'CAD',
          label: 'CAD',
          detail: 'Canadian Dollars',
        },
        {
          value: 'IDR',
          label: 'IDR',
          detail: 'Indonesian Rupiah',
        },
        {
          value: 'GBP',
          label: 'GBP',
          detail: 'British Pounds',
        },
        {
          value: 'SGD',
          label: 'SGD',
          detail: 'Singapore Dollars',
        },
        {
          value: 'INR',
          label: 'INR',
          detail: 'Indian Rupees',
        },
        {
          value: 'MYR',
          label: 'MYR',
          detail: 'Malaysian Ringgits',
        },
        {
          value: 'JPY',
          label: 'JPY',
          detail: 'Japanese Yen',
        },
        {
          value: 'KRW',
          label: 'KRW',
          detail: 'South Korean Won',
        },
      ],
      currency: '',
    };
  },
  methods: {
    setDisabledOption(option) {
      const checkOption = this.selectedCurrency.find(currency => currency.currency === option);
      return typeof checkOption !== 'undefined';
    },
    add() {
      this.$emit('addCurrency', this.currency);
      this.currency = '';
    },
  },
};
</script>
