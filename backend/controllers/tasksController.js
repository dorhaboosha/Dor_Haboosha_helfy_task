
const database = require('../database/tasksDatabase');

async function getAllTasks(req, res, next) {
    try {
        res.json(database.getAll());
    }

    catch (err) {
        next(err);
    }
}

async function createTask(req, res, next) {
  try {
    const task = database.create(req.body);
    res.status(201).json(task);
  } 
  
  catch (err) { 
    next(err);
 }
}

async function updateTask(req, res, next) {
    try {
        const updated = database.update(req.id, req.body);
        if (!updated) {
            return res.status(404).json({ error: { message: 'Task not found' } });
        }
        
        res.json(updated);
    }

    catch (err) {
        next(err);
    }
}

async function deleteTask(req, res, next) {
      try {
        const ok = database.remove(req.id);
        if (!ok) {
            return res.status(404).json({ error: { message: 'Task not found' } });
        }

        res.status(204).end();
      }

      catch (err) {
          next(err);
      }
}

async function toggleTask(req, res, next) {
    try {
        const t = database.toggle(req.id);

        if (!t) {
            return res.status(404).json({ error: { message: 'Task not found' } }); 
        }

        res.json(t);
    }

    catch (err) {
        next(err);
    }
}

module.exports = { getAllTasks, createTask, updateTask, deleteTask, toggleTask };