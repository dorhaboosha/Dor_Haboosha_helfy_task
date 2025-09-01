


const allowedPriorities = new Set(['low', 'medium', 'high']);
const MAX_TITLE_LENGTH = 120;
const MAX_DESCRIPTION_LENGTH = 1000;

function isValidId(req, res, next) {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {        
        return res.status(400).json({ error: { message: 'Invalid id' } });
    }

    req.id = id;
    next();
}

function validateCreate(req, res, next) {
    const { title, description = '', priority = 'low' } = req.body || {};

    if (typeof title !== 'string' || title.trim().length === 0 || title.trim().length > MAX_TITLE_LENGTH) {
        return res.status(400).json({ error: { message: 'Title is required and must be a non-empty string (1-120 characters)' } });
    }

    if (typeof description !== 'string' || description.trim().length > MAX_DESCRIPTION_LENGTH) {
        return res.status(400).json({ error: { message: 'Description must be a string (1-1000 characters)' } });
    }
    
    if (priority !== undefined && !allowedPriorities.has(priority))  {
        return res.status(400).json({ error: { message: 'Invalid priority' } });
    }
    
    next();
}

function validateUpdate(req, res, next) {
    const { title, description = '', priority, completed } = req.body || {};
    
    if (typeof title !== 'string' || title.trim().length === 0) {
        return res.status(400).json({ error: { message: 'Invalid title' } });
    }
    
    if (typeof description !== 'string') {
        return res.status(400).json({ error: { message: 'Invalid description' } });
    }
    
    if (!allowedPriorities.has(priority)) {
        return res.status(400).json({ error: { message: 'Invalid priority' } });
    }
    
    if (completed !== undefined && typeof completed !== 'boolean') {
        return res.status(400).json({ error: { message: 'Invalid completed flag' } });
    }
    
    next();
}

module.exports = { isValidId, validateCreate, validateUpdate };