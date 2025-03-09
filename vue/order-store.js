import { defineStore } from 'pinia';
import axios from 'axios';

export const useOrderStore = defineStore('order', {
  state: () => ({
    items: [],
    total: 0,
    status: 'Pending',
    discountTemplates: {
      electronics: { type: 'percentage', value: 10 },
      fashion: { type: 'flat', value: 20 },
      groceries: { type: 'buyXgetY', value: { x: 3, y: 1 } },
    },
  }),

  actions: {
    async fetchOrder() {
      const response = await axios.get('/api/order');
      this.total = response.data.total;
      this.status = response.data.status;
    },

    async addItem(name, price, quantity = 1) {
      await axios.post('/api/order/add-item', { name, price, quantity });
      await this.fetchOrder();
    },

    async applyDiscount(category) {
      if (!this.discountTemplates[category]) {
        throw new Error('Invalid category for discount template');
      }
      await axios.post('/api/order/apply-discount', { category });
      await this.fetchOrder();
    },

    async updateStatus(newStatus) {
      const validStatuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
      if (!validStatuses.includes(newStatus)) {
        throw new Error('Invalid status');
      }
      await axios.post('/api/order/update-status', { status: newStatus });
      await this.fetchOrder();
    },
  },
});
