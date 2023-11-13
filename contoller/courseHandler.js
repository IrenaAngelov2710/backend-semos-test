const Course = require("../model/course/courseSchema");

exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).json({
            status: "success",
            data: {
                courses,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: "fail", 
            message: err,
        });
    }
};

exports.getOneCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        res.status(200).json({
            status: "success",
            data: {
                course,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err,
        });
    }
};

exports.updateCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
          });
          res.status(200).json({
            status: "success",
            data: { 
                course
            },
          });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err
        });
    }
};

exports.deleteCourse = async (req, res) => {
    try {
        await Course.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: "success",
            data: null,
        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err
        });
    }
};

exports.createCourse = async (req, res) => {
    try {
        const newCourse = await Course.create(req.body);
        res.status(201).json({
            data: {
                course: newCourse,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err,
        });
    }
};

exports.createByUser = async (req, res) => {
    try {
        const course = await Course.create({
            name: req.body.name,
            address: req.body.address,
            area: req.body.area,
            author: req.auth.id,
        });
        res.status(201).json(course);
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err,
        });
    }
};

exports.getByUser = async (req, res) => {
    try {
        const courses = await Course.find({ author: req.auth.id });
        res.status(201).json(courses);
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err
        });
    }
};