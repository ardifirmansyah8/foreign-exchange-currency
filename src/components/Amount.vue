<template>
  <div>
    <el-form label-width="50px">
      <h4><i>USD - United States Dollars</i></h4>
      <el-form-item class="amount" label="USD">
        <el-input
          placeholder="Please input amount"
          v-model="amountValue"
          :clearable="true"
          @keypress.native="isNumber"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
/* eslint-disable consistent-return */

export default {
  name: 'component-amount',
  data() {
    return {
      amountValue: '0',
    };
  },
  watch: {
    amountValue(val) {
      const result = val && val.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      this.$nextTick(() => {
        this.amountValue = result;
        this.$emit('setAmount', result);
      });
    },
  },
  mounted() {
    this.amountValue = '10000';
  },
  methods: {
    isNumber(evt) {
      const charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
  },
};
</script>
