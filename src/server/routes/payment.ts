import { Router } from 'express';

const router = Router();

router.post('/initiate', (req, res) => {
  res.json({ message: 'Initiate payment' });
});

router.get('/:id', (req, res) => {
  res.json({ message: 'Get payment by ID', id: req.params.id });
});

router.post('/:id/confirm', (req, res) => {
  res.json({ message: 'Confirm payment', id: req.params.id });
});

export default router;
