<template>
  <div>
    <el-card shadow="never" class="mb-20">
      <el-row :gutter="20" type="flex" align="middle">
        <el-col :span="20">
          <div>
            <el-row :gutter="20" type="flex" justify="space-between">
              <el-col :span="4">
                <label class="text-20 bold">{{ data.currency }}</label>
              </el-col>
              <el-col :span="20" class="right">
                <label class="text-20 bold">{{ getRate(amount, data.value).toLocaleString('US') }}</label>
              </el-col>
            </el-row>
            <h5 class="mt-10 mb-10"><i>{{ `${data.currency} - ${data.detail}` }}</i></h5>
            <label class="text-12">
              <i>1 USD = {{ data.currency }} <span>{{ data.value.toLocaleString('US') }}</span></i>
            </label>
          </div>
        </el-col>

        <el-col :span="4">
          <div class="center">
            <i class="el-icon-delete" @click="remove(index)"></i>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'component-currency',
  props: {
    data: {
      type: Object,
      required: true,
      default: () => {}
    },
    index: {
      type: Number,
      required: true,
      default: () => 0
    },
    amount: {
      type: String,
      required: true,
      default: () => '0'
    },
    remove: {
      type: Function,
      required: true,
      default: () => {}
    },
    round: {
      type: Function,
      required: true,
      default: () => {}
    }
  },
  data() {
    return {
      selectedCurrency: []
    };
  },
  methods: {
    getRate(amount, rate) {
      return this.round(Number(amount) * rate);
    }
  }
}
</script>