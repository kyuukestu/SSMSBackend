import express from 'express';
import * as userController from '../../Controllers/userController.js';

const userRouter = express.Router();

userRouter
	.route('/')
	.get(userController.getAllUsers)
	.put(userController.updateUser)
	.delete(userController.deleteUser);

userRouter.route('/User/:name').get(userController.getUserbyName);

userRouter.route('/:id').get(userController.getUser);

userRouter
	.route('/usersgroups')
	.post(userController.addUserGroup)
	.delete(userController.removeUserGroup);

userRouter.route('/usersgroups/:id').get(userController.getAllUserGroups);

export default userRouter;
