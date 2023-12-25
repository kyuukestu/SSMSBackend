import express from 'express';
import * as employeesController from '../../Controllers/employeesController.js';
import rolesList from '../../Config/rolesList.js';
import verifyRoles from '../../Middleware/verifyRoles.js';
const employeeRouter = express.Router();

employeeRouter
	.route('/')
	.get(employeesController.getAllEmployees)
	// Verifies that this role is allowed to perform a given function
	//Add & fix verifyRoles
	.post(employeesController.createNewEmployee)
	.put(employeesController.updateEmployee)
	.delete(employeesController.deleteEmployee);

employeeRouter.route('/:id').get(employeesController.getEmployee);

export default employeeRouter;
