import express from 'express'
import { deleteUser, getAllUsers, getParam, register, specialFunc, updateUser } from '../controllers/users.controller.js';
import { User } from '../models/users.model.js';

const router = express.Router();

// Data creating POST API
router.post('/new', register)

// Data retrieval GET API
router.get('/all', getAllUsers);


// Static route with same previous path
router.get('/userid/special', specialFunc)

// Dynamic route to fetch parameters from url
router.route('/userid/:id').get(getParam).put(updateUser).delete(deleteUser);

// router.get('/userid/:id', getParam)
// router.put('/userid/:id', updateUser)
// router.delete('/userid/:id', deleteUser)

export default router;