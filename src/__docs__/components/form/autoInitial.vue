<template>
  <el-tabs v-model="activeTab">
    <el-tab-pane
      v-for="item in tabs"
      :key="item.name"
      :name="item.name"
      :label="item.label"
    >
      <EnhancedElForm v-model="model" :schema="schema" />
    </el-tab-pane>
  </el-tabs>
  <div>model: {{ model }}</div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { EnhancedElForm } from '@src';

const model = ref({});
const activeTab = ref('first');
const tabs = ref([
  {
    label: '表單一',
    name: 'first',
  },
  {
    label: '表單二',
    name: 'second',
  },
]);

const schemaArray = [
  {
    label: '姓名',
    prop: 'name',
    rules: { required: true, message: '請輸入名稱', trigger: 'blur' },
    type: 'input',
  },
  {
    label: '性別',
    prop: 'sex',
    rules: { required: true, message: '請選擇性別', trigger: 'blur' },
    type: 'radio',
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
    defaultValue: 'male',
  },
  {
    label: '興趣',
    prop: 'hobby',
    type: 'select',
    attrs: {
      multiple: true,
    },
    options: [
      {
        label: '籃球',
        value: 'basketball',
      },
      {
        label: '桌球',
        value: 'billiards',
      },
      {
        label: '網球',
        value: 'table tennise',
      },
      {
        label: '羽球',
        value: 'badminton',
      },
    ],
    defaultValue: ['basketball'],
  },
  {
    label: '在職中',
    prop: 'work',
    type: 'checkbox',
    defaultValue: true,
  },
  {
    label: '開放履歷',
    prop: 'isOpen',
    type: 'switch',
    defaultValue: false,
  },
  {
    label: '備註',
    prop: 'remark',
    type: 'input',
    attrs: {
      type: 'textarea',
    },
  },
];
const schema = computed(() => {
  const schemaMap = {
    first: schemaArray.slice(0, 2), // pick name,sex
    second: schemaArray.slice(1), // pick sex and the rest
  };
  return schemaMap[activeTab.value];
});
</script>
