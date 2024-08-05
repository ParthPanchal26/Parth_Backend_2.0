import { Task } from '../models/tasks.model.js'

export const newTask = async (req, res, next) => {

    const { title, description } = req.body;

    await Task.create({
        title,
        description,
        user: req.user,
    })

    res.status(201).json({
        success: true,
        message: "Task created!",
    })

}

export const getMyTask = async (req, res) => {

    const userID = req.user._id;

    const tasks = await Task.find({
        user: userID
    });

    res.status(200).json({
        success: true,
        tasks,
    })

}

export const updateTask = async (req, res) => {

    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({
        success: false,
        message: "Inavalid Id!",
    })

    task.isCompleted = !task.isCompleted;

    await task.save();

    res.status(200).json({
        success: true,
        message: "Task updated!",
    })

}

export const deleteTask = async (req, res) => {

    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({
        success: false,
        message: "Inavalid Id!",
    })

    await task.deleteOne();

    res.status(200).json({
        success: true,
        message: "Task deleted!",
    })

}
