<script setup>
import { useOrderStore } from '@/stores/orderStore';
import { computed, ref } from 'vue';

const orderStore = useOrderStore();
const discountTemplates = computed(() => orderStore.discountTemplates);

const newCategory = ref('');
const newType = ref('percentage');
const newValue = ref(0);
const newValueX = ref(1);
const newValueY = ref(1);

const updateTemplate = (category, template) => {
  orderStore.discountTemplates[category] = { ...template };
};

const deleteTemplate = (category) => {
  delete orderStore.discountTemplates[category];
};

const addTemplate = () => {
  if (!newCategory.value.trim()) return;
  
  let value = newType.value === 'buyXgetY' 
    ? { x: newValueX.value, y: newValueY.value } 
    : newValue.value;
  
  orderStore.discountTemplates[newCategory.value] = {
    type: newType.value,
    value
  };
  
  newCategory.value = '';
  newType.value = 'percentage';
  newValue.value = 0;
  newValueX.value = 1;
  newValueY.value = 1;
};
</script>

<template>
  <div class="max-w-lg mx-auto p-6 border border-gray-300 rounded-lg shadow-md bg-white">
    <h2 class="text-xl font-bold mb-4">Manage Discount Templates</h2>

    <div v-for="(template, category) in discountTemplates" :key="category" class="mb-4 p-4 border border-gray-200 rounded-lg">
      <h3 class="text-lg font-semibold">{{ category }}</h3>
      <select v-model="template.type" class="block w-full mt-2 p-2 border rounded">
        <option value="percentage">Percentage</option>
        <option value="flat">Flat</option>
        <option value="buyXgetY">Buy X Get Y</option>
      </select>
      <input v-if="template.type === 'percentage'" v-model.number="template.value" type="number" placeholder="% Discount" class="mt-2 p-2 w-full border rounded" />
      <input v-if="template.type === 'flat'" v-model.number="template.value" type="number" placeholder="$ Discount" class="mt-2 p-2 w-full border rounded" />
      <div v-if="template.type === 'buyXgetY'" class="mt-2 flex gap-2">
        <input v-model.number="template.value.x" type="number" placeholder="Buy X" class="p-2 border rounded w-1/2" />
        <input v-model.number="template.value.y" type="number" placeholder="Get Y Free" class="p-2 border rounded w-1/2" />
      </div>
      <button @click="updateTemplate(category, template)" class="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Save</button>
      <button @click="deleteTemplate(category)" class="mt-2 ml-2 px-4 py-2 bg-red-500 text-white rounded">Delete</button>
    </div>

    <div class="mt-6 p-4 border border-gray-200 rounded-lg">
      <h3 class="text-lg font-semibold">Add New Template</h3>
      <input v-model="newCategory" placeholder="New Category" class="mt-2 p-2 w-full border rounded" />
      <select v-model="newType" class="block w-full mt-2 p-2 border rounded">
        <option value="percentage">Percentage</option>
        <option value="flat">Flat</option>
        <option value="buyXgetY">Buy X Get Y</option>
      </select>
      <input v-if="newType === 'percentage'" v-model.number="newValue" type="number" placeholder="% Discount" class="mt-2 p-2 w-full border rounded" />
      <input v-if="newType === 'flat'" v-model.number="newValue" type="number" placeholder="$ Discount" class="mt-2 p-2 w-full border rounded" />
      <div v-if="newType === 'buyXgetY'" class="mt-2 flex gap-2">
        <input v-model.number="newValueX" type="number" placeholder="Buy X" class="p-2 border rounded w-1/2" />
        <input v-model.number="newValueY" type="number" placeholder="Get Y Free" class="p-2 border rounded w-1/2" />
      </div>
      <button @click="addTemplate" class="mt-2 px-4 py-2 bg-green-500 text-white rounded w-full">Add Template</button>
    </div>
  </div>
</template>