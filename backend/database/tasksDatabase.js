
/**
 * Task model:
 *
 * Task {
 *   id: number,                       // auto-incremented, starts at 1
 *   title: string,                    // required
 *   description: string,              // optional, default: ''
 *   completed: boolean,               // default: false
 *   createdAt: Date,                  // Date object set by server
 *   priority: 'low' | 'medium' | 'high' // default: 'low'
 * }
 */

let tasks = [];
let nextId = 1;


/**
 * Return all tasks (return a copy to avoid any changes).
 */
function getAll() {
  return tasks.slice();
}


/**
 * Create a new task.
 * Assumes validation was done in middleware.
 */
function create({ title, description = '', priority = 'low' }) {
    const task = {
        id: nextId++,
        title: title.trim(),
        description: (typeof description === 'string' ? description : '').trim(),
        completed: false,
        createdAt: new Date(),
        priority
    };

    tasks.push(task);
    return task;
}

/**
 * Find a task by id.
 */
function findById(id) {
  return tasks.find(t => t.id === id) || null;
}

/**
 * Update an existing task by id (full update semantics for allowed fields).
 * Returns the updated task or null if not found.
 * Note: createdAt don't change.
 */
function update(id, updates) {

  const idTasx = tasks.findIndex(t => t.id === id);
  
  if (idTasx === -1) {
    return null;
  }

  const current = tasks[idTasx];

  const updated = {
    ...current,
    title: updates.title.trim(),
    description: (typeof updates.description === 'string' ? updates.description : '').trim(),
    priority: updates.priority,
    completed: typeof updates.completed === 'boolean' ? updates.completed : current.completed
  };

  tasks[idTasx] = updated;
  return updated;
}


/**
 * Remove a task by id.
 * Returns true if something was deleted, false otherwise.
 */

function remove(id) {
  const before = tasks.length;
  tasks = tasks.filter(t => t.id !== id);
  return tasks.length !== before;
}


/**
 * Toggle completion status for a task by id.
 * Returns the updated task or null if not found.
 */
function toggle(id) {
  const task = findById(id);
  if (!task) {
        return null;
  }
  
  task.completed = !task.completed;
  return task;
}

/**
 * Reset database (for tests).
 */
function _reset() {
  tasks = [];
  nextId = 1;
}


module.exports = { getAll, create, findById, update, remove, toggle, _reset };