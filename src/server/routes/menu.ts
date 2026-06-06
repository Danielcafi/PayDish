import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Get menu items' });
});

router.post('/', (req, res) => {
  res.json({ message: 'Create menu item' });
});

export default router;
