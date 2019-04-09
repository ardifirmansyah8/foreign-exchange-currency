<template>
  <div>
    <el-form label-width="50px">
      <h4><i>USD - United States Dollars</i></h4>
      <el-form-item class="amount" label="USD">
        <el-input
          placeholder="Please input amount"
          v-model="value"
          :clearable="true"
          @keypress.native="isNumber"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'component-amount',
  data() {
    return {
        value: '0'
    };
  },
  watch: {
    value: function (val) {
      if (val) {
        const result = val.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        this.$nextTick(() => {
          this.value = result;
          this.$emit('setAmount', result);
        });
      }
    },
  },
  mounted() {
    this.value = '10000';
  },
  methods: {
    isNumber (evt) {
      let charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
          evt.preventDefault()
      } else {
          return true
      }
    }
  }
}
</script>