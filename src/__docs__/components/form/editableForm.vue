<template>
  <EnhancedElForm
    ref="formRef"
    v-model="model"
    :schema="schema"
    canEditing
    :alwaysEditableColumns="['password']"
  >
    <template #form-other="{ isEditing }">
      <el-alert
        v-if="!isEditing && !model.other"
        :class="{ 'cursor-pointer': !isEditing }"
        title="slot 表單須自行實作編輯/檢視"
        type="info"
        :closable="false"
      />
      <el-input
        v-if="isEditing"
        type="textarea"
        v-model="model.other"
        @blur="handleBlurOther"
      />
      <div v-else class="cursor-pointer">
        {{ model.other }}
      </div>
    </template>
    <template #footer>
      <el-button type="primary" @click="submit">送出</el-button>
    </template>
  </EnhancedElForm>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { ElMessage } from 'element-plus';
import { EnhancedElForm } from '@src';

const formRef = ref<InstanceType<typeof EnhancedElForm>>(null);
const model = ref({
  name: 'Joshua Yeh',
  phone: '0900123456',
  email: 'yamapi0103@gmail.com',
  sex: 'male',
  password: 'qwe123',
  deposit: 1000000,
  note: '',
  other: '',
});

const schema = computed(() => [
  {
    label: '姓名',
    prop: 'name',
    type: 'input',
    rules: {
      required: true,
      message: '請輸入姓名',
      trigger: 'blur',
    },
  },
  {
    label: '性別',
    prop: 'sex',
    type: 'select',
    options: [
      {
        label: '男',
        value: 'male',
      },
      {
        label: '女',
        value: 'female',
      },
    ],
    formater: (value: string) => (value === 'male' ? '男' : '女'),
  },
  {
    label: '電話',
    prop: 'phone',
    type: 'input',
    attrs: {
      type: 'number',
    },
    rules: [
      {
        required: true,
        message: '請輸入手機',
        trigger: ['blur'],
      },
    ],
  },
  {
    label: '信箱',
    prop: 'email',
    type: 'input',
    rules: [
      {
        required: true,
        message: '請輸入email',
        trigger: ['blur'],
      },
      {
        type: 'email',
        message: '請輸入正確的email',
        trigger: ['blur', 'change'],
      },
    ],
  },
  {
    label: '密碼',
    prop: 'password',
    type: 'input',
    attrs: {
      type: 'password',
      showPassword: true,
    },
  },
  {
    label: '存款',
    prop: 'deposit',
    type: 'input-number',
    formater: (value: number) => value.toLocaleString(),
  },
  {
    label: '備註',
    type: 'input',
    prop: 'note',
    attrs: {
      type: 'textarea',
      rows: 2,
      placeholder: '請輸入備註',
    },
  },
  {
    label: '其他',
    prop: 'other',
    type: 'slot',
  },
]);

const submit = async () => {
  try {
    await formRef.value.validate();
    ElMessage({
      message: '送出成功',
      type: 'success',
    });
    formRef.value.clearEditingColumn();
  } catch (error) {
    const errKeys = Object.keys(error as Record<string, unknown>);
    errKeys.forEach(key => {
      formRef.value.editingColumn.add(key);
    });
  }
};

const handleBlurOther = () => {
  formRef.value.clearEditingColumn('other');
};
</script>
<style scoped lang="scss">
.cursor-pointer {
  cursor: pointer;
}

:deep(.footer-wrap) {
  display: flex;
  flex-direction: row-reverse;
}
</style>
