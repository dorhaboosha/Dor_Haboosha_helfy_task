
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// app.get('/', (req, res) => {

//     res.json({message: 'Backend start!'})
// });

const taskRoutes = require('./routes/tasks')

app.use('/api/tasks', taskRoutes);

const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});