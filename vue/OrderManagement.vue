<script setup>
import { ref, onMounted } from 'vue';
import orderModule from '@/modules/orderModule';

const orders = ref([]);
const newOrderTotal = ref(0);

const fetchOrders = async () => {
  orders.value = await orderModule.getOrders();
};

const addOrder = async () => {
  await orderModule.createOrder(newOrderTotal.value);
  newOrderTotal.value = 0;
  await fetchOrders();
};

const updateStatus = async (orderId, status) => {
  await orderModule.updateOrderStatus(orderId, status);
  await fetchOrders();
};

onMounted(fetchOrders);
</script>


<template>
  <div class="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200">
    <h2 class="text-2xl font-bold mb-4">Order Management</h2>

    <div v-for="(order, index) in orders" :key="index" class="mb-4 p-4 border border-gray-300 rounded-lg">
      <h3 class="text-lg font-semibold">Order #{{ order.id }}</h3>
      <p class="text-gray-700">Total: ${{ order.total }}</p>
      <p class="text-sm text-gray-500">Status: {{ order.status }}</p>
      <button @click="updateStatus(order.id, 'Processing')" class="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Process</button>
      <button @click="updateStatus(order.id, 'Shipped')" class="mt-2 ml-2 px-4 py-2 bg-green-500 text-white rounded">Ship</button>
      <button @click="updateStatus(order.id, 'Cancelled')" class="mt-2 ml-2 px-4 py-2 bg-red-500 text-white rounded">Cancel</button>
    </div>

    <div class="mt-6 p-4 border border-gray-300 rounded-lg">
      <h3 class="text-lg font-semibold">Add New Order</h3>
      <input v-model.number="newOrderTotal" type="number" placeholder="Order Total" class="mt-2 p-2 w-full border rounded" />
      <button @click="addOrder" class="mt-2 px-4 py-2 bg-green-500 text-white rounded w-full">Add Order</button>
    </div>
  </div>
</template>

