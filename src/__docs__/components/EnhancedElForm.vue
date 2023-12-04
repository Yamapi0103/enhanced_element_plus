<template>
  <el-form
    ref="enhancedElForm"
    class="enhanced-el-form"
    :inline="isInline"
    :model="model"
    :label-width="labelWidth"
    :disabled="disabled"
    :label-position="labelPosition"
    @keyup.enter="typeof enterSearch === 'function' ? formSubmit() : () => {}"
    @compositionstart="compositionStart = true"
    @compositionend="compositionStart = false"
  >
    <el-form-item
      v-for="config in processedSchema"
      :key="config.prop"
      :rules="config.rules"
      :label="config.label || ''"
      :prop="config.prop"
      :class="`clazz-${config.prop} ${
        canEditing && !config.type ? 'curosr-pointer' : ''
      }`"
      @click="canEditing && clickFormItem(config.prop)"
    >
      <!-- slot 自定義列-->
      <template v-if="config.type === 'slot'">
        <slot :name="`form-${config.prop}`" :config="config" :model="model" />
      </template>
      <!-- render VNode -->
      <template v-else-if="typeof config.render === 'function'">
        <LbRender :scope="model" :render="config.render" />
      </template>
      <template v-else-if="config.type === 'select'">
        <el-select
          v-bind="config.attrs ? config.attrs : {}"
          :style="config.style"
          :size="config.size ? config.size : 'large'"
          v-model="model[config.prop]"
          :disabled="handleDisabled(config.disabled)"
          :placeholder="config.placeholder"
          @change="config.change ? config.change($event, model) : () => {}"
        >
          <el-option
            v-for="(item, index) in config.props.options"
            :key="index"
            :value="typeof item === 'object' ? item.value : item"
            :label="typeof item === 'object' ? item.label : item"
          />
        </el-select>
      </template>
      <template v-else-if="config.type === 'radio'">
        <el-radio-group v-model="model[config.prop]">
          <el-radio
            v-for="(item, index) in config.props.options"
            :key="index"
            :label="item.value"
            >{{ item.label }}</el-radio
          >
        </el-radio-group>
      </template>
      <template v-else-if="config.type?.includes('date')">
        <el-date-picker
          v-model="model[config.prop]"
          :type="config.type"
          value-format="YYYY-MM-DD"
          :size="config.size ? config.size : 'large'"
          :placeholder="config.placeholder"
          :disabled="handleDisabled(config.disabled)"
          v-bind="config.attrs"
        />
      </template>
      <component
        v-else-if="config.type"
        :is="`el-${config.type}`"
        v-model="model[config.prop]"
        :disabled="handleDisabled(config.disabled)"
        v-bind="config.attrs"
      >
      </component>
      <!-- config沒給type則純顯示label -->
      <template v-else>
        {{ model[config.prop] }}
      </template>
    </el-form-item>
  </el-form>
</template>
<script>
import _ from 'lodash';
export default {
  name: 'enhancedElForm',
  props: {
    model: Object,
    schema: Array,
    labelWidth: String,
    canEditing: Boolean,
    isInline: { type: Boolean },
    enterSearch: Function,
    labelPosition: {
      type: String,
      default: 'right',
      validator: value => ['right', 'left', 'top'].includes(value),
    },
    disabled: {
      type: Boolean,
    },
  },
  data() {
    return {
      editingColumn: new Set([]),
      compositionStart: false,
    };
  },
  mounted() {
    // 將form 提供的事件暴露到data上，供外部ref使用
    const exposeMethods = ['validate', 'resetField', 'clearValidate'];
    const ref = this.$refs['enhancedElForm'];
    exposeMethods.forEach(item => (this[item] = ref[item]));
  },
  components: {
    LbRender: {
      name: 'LbRender',
      functional: true,
      props: {
        scope: Object,
        render: Function,
      },
      render: (h, ctx) => {
        return ctx.props.render ? ctx.props.render(h, ctx.props.scope) : '';
      },
    },
  },
  watch: {
    schema: {
      handler(list) {
        // model 若帶著入空物件，可依據schema defaultValue給預設值
        if (!list) return;
        for (let i = 0; i < list.length; i++) {
          const formitem = list[i];
          const { prop, defaultValue = '' } = formitem;
          if (!(prop in this.model)) {
            this.model[prop] = defaultValue;
          }
        }
      },
      immediate: true,
      deep: true,
    },
  },
  computed: {
    processedSchema() {
      if (!this.canEditing) return this.schema;
      const newSchema = this.schema.map(config => {
        const { prop, type } = config;
        if (!type) return config; // 本來就沒定義type表示純顯示
        if (!this.editingColumn.has(prop)) {
          // 獨立處理number 非編輯模式下加上千分位 反之變回數字

          return _.omit(config, 'type');
        } else {
          if (type === 'number' && typeof this.model[prop] === 'string') {
            this.model[prop] = parseInt(this.model[prop].replace(/,/g, ''), 10);
          }
        }
        return config;
      });
      return newSchema;
    },
  },
  methods: {
    formSubmit() {
      if (this.compositionStart) return;
      this.enterSearch();
    },
    clickFormItem(prop) {
      this.editingColumn.add(prop);
    },
    clearEditingColumn(prop) {
      if (!prop) {
        this.editingColumn.clear();
      } else {
        this.editingColumn.delete(prop);
      }
    },
    handleDisabled(disabled = false) {
      return typeof disabled === 'function' ? disabled() : disabled;
    },
  },
};
</script>
<style lang="scss" scoped>
:deep(.el-form-item) {
  &.curosr-pointer {
    cursor: pointer;
  }
}
</style>