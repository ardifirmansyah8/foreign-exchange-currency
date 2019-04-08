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

          <el-card shadow="never">
            <el-row :gutter="20" type="flex" align="middle">
              <el-col :span="20">
                <div>
                  <el-row :gutter="20" type="flex" justify="space-between">
                    <el-col :span="4">
                      <label class="text-20 bold">IDR</label>
                    </el-col>
                    <el-col :span="20" class="right">
                      <label class="text-20 bold">144,105,011</label>
                    </el-col>
                  </el-row>
                  <h5 class="mt-10 mb-10"><i>IDR - Indonesian Rupiah</i></h5>
                  <label class="text-12"><i>1 USD = IDR <span>14,140,000</span></i></label>
                </div>
              </el-col>

              <el-col :span="4">
                <div class="center">
                  <i class="el-icon-delete"></i>
                </div>
              </el-col>
            </el-row>
          </el-card>

          <el-row :gutter="20" type="flex" align="middle" class="mt-20">
            <el-col :span="16">
              <el-select v-model="currency" placeholder="Add More Currencies" class="fluid">
                <el-option
                  v-for="item in currencies"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="8">
              <el-button type="primary" class="fluid">Submit</el-button>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      amount: '0',
      currencies: [
        {
          value: 'USD',
          label: 'USD'
        },
        {
          value: 'CAD',
          label: 'CAD'
        },
        {
          value: 'IDR',
          label: 'IDR'
        },
        {
          value: 'GBP',
          label: 'GBP'
        },
        {
          value: 'SGD',
          label: 'SGD'
        },
        {
          value: 'INR',
          label: 'INR'
        },
        {
          value: 'MYR',
          label: 'MYR'
        },
        {
          value: 'JPY',
          label: 'JPY'
        },
        {
          value: 'KRW',
          label: 'KRW'
        }
      ],
      currency: ''
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
  },
  methods: {
    isNumber (evt) {
      let charCode = (evt.which) ? evt.which : evt.keyCode
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
          evt.preventDefault()
      } else {
          return true
      }
    }
  }
}
</script>