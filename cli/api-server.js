const express = require('express');
const Order = require('./orderModule');
const cors = require('cors');

const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());

const order = new Order();

app.get('/api/order', (req, res) => {
    res.json({ total: order.getTotal(), status: order.getStatus() });
});

app.post('/api/order/add-item', (req, res) => {
    const { name, price, quantity } = req.body;
    order.addItem(name, price, quantity);
    res.json({ success: true, total: order.getTotal() });
});

app.post('/api/order/apply-discount', (req, res) => {
    const { category } = req.body;
    order.applyDiscountTemplate(category);
    res.json({ success: true, total: order.getTotal() });
});

app.post('/api/order/update-status', (req, res) => {
    const { status } = req.body;
    order.updateStatus(status);
    res.json({ success: true, status: order.getStatus() });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
