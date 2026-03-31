<template>
  <el-form
    ref="enhancedElFormRef"
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
      @click="canEditing && addEditingColumn(config.prop)"
    >
      <!-- slot 自定義列-->
      <template v-if="config.type === 'slot'">
        <slot
          :name="`form-${config.prop}`"
          :config="config"
          :isEditing="editingColumn.has(config.prop)"
        />
      </template>
      <!-- render VNode -->
      <template v-else-if="typeof config.render === 'function'">
        <LbRender :render="config.render" />
      </template>
      <template v-else-if="config.type === 'select'">
        <el-select
          v-bind="config.attrs ? config.attrs : {}"
          v-model="model[config.prop]"
          @change="config.change ? config.change($event, model) : () => {}"
        >
          <el-option
            v-for="(item, index) in config.options"
            :key="index"
            :value="typeof item === 'object' ? item.value : item"
            :label="typeof item === 'object' ? item.label : item"
          />
        </el-select>
      </template>
      <template v-else-if="config.type === 'radio'">
        <el-radio-group v-model="model[config.prop]">
          <el-radio
            v-for="(item, index) in config.options"
            :key="index"
            :label="item.value"
          >
            {{ item.label }}
          </el-radio>
        </el-radio-group>
      </template>
      <template v-else-if="config.type === 'datepicker'">
        <el-date-picker
          v-model="model[config.prop]"
          value-format="YYYY-MM-DD"
          v-bind="config.attrs"
        />
      </template>
      <template v-else-if="config.type === 'input'">
        <el-input
          :ref="(vc: any)=>inputRefs[config.prop] =vc"
          v-model="model[config.prop]"
          v-bind="config.attrs"
        />
      </template>
      <component
        v-else-if="config.type"
        :is="`el-${config.type}`"
        v-model="model[config.prop]"
        v-bind="config.attrs"
      />
      <!-- config沒給type則純顯示label -->
      <template v-else>
        {{ config.formater?.(model[config.prop]) || model[config.prop] }}
      </template>
      <template v-if="typeof config.nestedSchema === 'function'">
        <EnhancedElForm
          :schema="config.nestedSchema?.(model[config.prop])"
          v-model="model"
        />
      </template>
    </el-form-item>
    <div class="footer-wrap">
      <slot name="footer"></slot>
    </div>
  </el-form>
</template>
<script setup lang="ts">
import {
  ref,
  reactive,
  computed,
  watch,
  VNode,
  toRefs,
  nextTick,
} from 'vue';
import _ from 'lodash';
import { OptionType } from 'element-plus/es/components/select-v2/src/select.types';
import { FormItemRule } from 'element-plus';
import { Arrayable } from 'element-plus/es/utils';
import { ElForm, FormItemProp } from 'element-plus';
import { useVModel } from '@vueuse/core';

interface LbRenderProps {
  render: (model: ModelProps) => VNode;
}

interface ModelProps {
  [key: string]: any;
}
interface SchemaProps {
  type?: 'slot' | 'select' | 'input' | 'checkbox' | 'radio' | 'datepicker';
  label?: string;
  prop: string;
  attrs: {
    [key: string]: any;
  };
  rules?: Arrayable<FormItemRule>;
  render: (scope: ModelProps) => VNode;
  change?: (value: any, model: ModelProps) => void;
  options?: OptionType | string[];
  defaultValue?: any;
  formater?: (value: any) => string;
  nestedSchema?: (value: any) => SchemaProps;
}

const props = withDefaults(
  defineProps<{
    modelValue: ModelProps;
    schema: SchemaProps[];
    labelWidth?: string | number;
    canEditing?: boolean;
    isInline?: boolean;
    enterSearch?: () => void;
    labelPosition?: 'left' | 'right' | 'top';
    disabled?: boolean;
    alwaysEditableColumns?: string[];
  }>(),
  {
    schema: () => [],
    labelWidth: '',
    labelPosition: 'right',
    alwaysEditableColumns: () => [],
    enterSearch: () => {},
  },
);

const emit = defineEmits();

const {
  schema,
  canEditing,
  labelWidth,
  isInline,
  enterSearch,
  labelPosition,
  disabled,
  alwaysEditableColumns,
} = toRefs(props);

const model = useVModel(props, 'modelValue', emit);

const editingColumn = reactive(new Set());
const compositionStart = ref(false);
const enhancedElFormRef = ref<InstanceType<typeof ElForm>>();
const inputRefs = reactive<Record<string, any>>({});

const LbRender = (lbProps: LbRenderProps) =>
  lbProps.render ? lbProps.render(model) : '';

alwaysEditableColumns.value.forEach(prop => editingColumn.add(prop));

const clearOldSchema = (oldSchema: SchemaProps[], newSchema: SchemaProps[]) => {
  const oldProps = oldSchema?.map(item => item.prop);
  const newList = newSchema.map(item => item.prop);
  const oldDiffs = _.difference(oldProps, newList); // oldDiffs = oldProps exclude newList
  oldDiffs.forEach(prop => {
    delete model.value[prop];
  });
};

watch(
  () => props.schema,
  (list, oldList = []) => {
    // 當schema變動時，清除model上舊的schema prop
    clearOldSchema(oldList, list);

    // model 若帶著入空物件，可依據schema defaultValue給預設值
    for (let i = 0; i < list.length; i++) {
      const formItem = list[i];
      const { prop, defaultValue = '' } = formItem;
      if (!model.value.hasOwnProperty(prop)) {
        model.value[prop] = defaultValue;
      }
    }
  },
  {
    immediate: true,
  },
);

const processedSchema = computed<SchemaProps[]>(() => {
  if (!canEditing.value) return schema.value; // 非編輯模式，直接返回schema
  const newSchema = schema.value.map(config => {
    const { prop } = config;
    if (!editingColumn.has(prop) && config.type !== 'slot') {
      return _.omit(config, 'type'); // 非編輯狀態的表單項使其純顯示表單值
    }

    const handleOnBlur = async () => {
      config.attrs?.onBlur; // 執行原本的onBlur
      // 僅 input處理 on blur 移除編輯狀態，若沒驗證成功則維持編輯狀態
      if (!alwaysEditableColumns.value.includes(prop)) {
        try {
          await validateField(prop);
          editingColumn.delete(prop);
        } catch (e) {
          console.log(e);
        }
      }
    };

    config.attrs = {
      ...config.attrs,
      onBlur: handleOnBlur,
    };
    return config;
  });
  return newSchema;
});

const formSubmit = () => {
  if (compositionStart) return;
  enterSearch.value?.();
};
const addEditingColumn = (prop: string) => {
  editingColumn.add(prop);
  nextTick(() => {
    inputRefs[prop]?.focus();
  });
};
const clearEditingColumn = (prop: string) => {
  if (!prop) {
    editingColumn.clear();
    alwaysEditableColumns.value.forEach(column => editingColumn.add(column));
  } else {
    editingColumn.delete(prop);
  }
};

const validate = (...args: any) => enhancedElFormRef.value?.validate(...args);
const resetFields = (...args: any) =>
  enhancedElFormRef.value?.resetFields(...args);
const validateField = (...args: any) =>
  enhancedElFormRef.value?.validateField(...args);
const scrollToField = (prop: FormItemProp) =>
  enhancedElFormRef.value?.scrollToField(prop);
const clearValidate = (...args: any) =>
  enhancedElFormRef.value?.clearValidate(...args);

defineExpose({
  editingColumn,
  clearEditingColumn,
  validate,
  resetFields,
  validateField,
  scrollToField,
  clearValidate,
});
</script>

<style lang="scss" scoped>
.enhanced-el-form .enhanced-el-form {
  flex-basis: 100%;
  :deep(.el-form-item) {
    &:first-child {
      margin-top: 18px;
    }
    margin-bottom: 18px;
  }
}
:deep(.el-form-item) {
  &.curosr-pointer {
    cursor: pointer;
  }
}
</style>
