const express = require('express');
const router = express.Router();
const auth = require('../middleware/authValidation');
const { check, validationResult } = require('express-validator');

const Task = require('../models/Task');

router.get('/', auth, async (req, res) => {
    try{
        const tasks = Task.find({user: req.user.id}); 
        res.json(tasks);
    }catch(err){
        console.err(err.message);
        res.status(500).send('Server Error!');
    }
});

router.post('/',
 [
    auth,
    [
        check('description', 'Please provide a task description!').not().isEmpty(),
        check('notice')
    ]
], 
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }
        const { description, notice, isItDone } = req.body;
            try{
                const newTask = new Task({
                    user: req.user.id,
                    description,
                    notice,
                    isItDone
                });

                const task = await newTask.save();
                res.json(task);

            }catch(err){
                console.err(err.message);
                res.status(500).send('Server Error!');
            }
});

router.put('/:id', auth, async (req, res) => {
    const { description, notice, isItDone } = req.body;

    const taskField = { description, notice, isItDone };

    try{
        const task = await Task.findById(req.param.id);
        if (!task) {
            return res.status(404).json({ msg: 'Task not found' });
        }
        if (task.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorised' });
        }

        task = await Task.findByIdAndUpdate(req.params.id, { $set: taskField }, { new: true });
        res.send(guest);
    }catch(err){
        console.err(err.message);
        res.status(500).send('Server Error!');
    }
});

router.delete('/:id', auth, async (req, res) => {
    try{
        if (!task) {
            return res.status(404).json({ msg: 'Task not found' });
        }
        if (task.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorised' });
        }

        await Task.findByIdAndDelete(req.param.id);
        res.send('Task Removed Successfully');
    }catch(err){
        console.err(err.message);
        res.status(500).send('Server Error!');
    }

});
module.exports = router;

