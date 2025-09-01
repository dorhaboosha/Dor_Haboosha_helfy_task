


const { Router } = require('express');
const controller = require('../controllers/tasksController');
const validator = require('../middleware/validate');

const router = Router();

router.get('/', controller.getAllTasks);
router.post('/', validator.validateCreate, controller.createTask);
router.put('/:id', validator.isValidId, validator.validateUpdate, controller.updateTask);
router.delete('/:id', validator.isValidId, controller.deleteTask);
router.patch('/:id/toggle', validator.isValidId, controller.toggleTask);

module.exports = router;