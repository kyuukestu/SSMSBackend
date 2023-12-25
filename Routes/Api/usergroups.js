import express from 'express';
import * as userGroupController from '../../Controllers/userGroupController.js';

const usergroupRouter = express.Router();

usergroupRouter
	.route('/')
	.get(userGroupController.getAllUserGroups)
	.post(userGroupController.createNewUserGroup)
	.put(userGroupController.updateUserGroup)
	.delete(userGroupController.deleteUserGroup);

usergroupRouter.route('/:id').get(userGroupController.getUserGroup);

usergroupRouter.route('/members').put(userGroupController.addGroupMember);

export default usergroupRouter;
