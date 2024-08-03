import express from 'express'
import { getAllUsers, getParam, register, login } from '../controllers/users.controller.js';

const router = express.Router();

router.post('/new', register)

router.post('/login', login);

router.get('/all', getAllUsers);

router.route('/userid/:id').get(getParam)

export default router;