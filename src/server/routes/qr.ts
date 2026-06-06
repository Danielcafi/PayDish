import { Router } from 'express';

const router = Router();

router.post('/generate', (req, res) => {
  res.json({ message: 'Generate QR code' });
});

router.get('/:id', (req, res) => {
  res.json({ message: 'Get QR code by ID', id: req.params.id });
});

export default router;
