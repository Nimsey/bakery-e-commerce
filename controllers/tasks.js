const express = require('express');
const router = express.Router();
const path = require('path');
const db = require('../models');


// POST route to create a new task
router.post('/tasks', async (req, res) => {
    try {
        const { title, priority, email } = req.body;
        console.log(req.body);
        // Find user by email
        const user = await db.user.findOne({ where: { email: email } });
        
        if (!user) {
            // Handle case where user is not found
            res.status(404).send("User not found");
        }

        // Create new task
        const newTask = await db.Task.create({
            title,
            priority
        });

        // Associate task with user
        await user.addTask(newTask);

        res.redirect('/'); // Redirect to the home page or tasks list page
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).send('Server error');
    }
});

// edit task
router.put('/edit/:taskId', async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const { editInput } = req.body; // Assuming 'editInput' is the name of your input field
        await db.Task.update({ title: editInput }, { where: { id: taskId } });
        res.redirect('/');
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).send('Server error');
    }
});

// delete task
router.delete('/erase/:taskId', async (req, res) => {
    try {
        const taskId = req.params.taskId; // Get the task ID from the URL parameteryour form
        await db.Task.destroy({
            where: {id: taskId}
            // Include other task fields as needed
        });
        res.redirect('/'); // Redirect to the home page or tasks list page
    } catch (error) {
        console.error('Error ending task:', error);
        res.status(500).send('Server error');
    }
});

// DELETE
// async function deleteUser() {
//     try {
//         let numOfRowsDeleted = await db.user.destroy({
//             where: { email: 'brainsmith@gmail.com' }
//         });
//         console.log('number of rows deleted >>>', numOfRowsDeleted);
//     } catch (error) {
//         console.log('did not delete user(s) because of >>>', error);
//     }
// }
// @todo run deleteUser function below

module.exports = router;
