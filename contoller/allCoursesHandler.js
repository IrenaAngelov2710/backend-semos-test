const Course = require("../model/course/courseSchema");
const ejs = require("ejs");

exports.allCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.render ("allCourses", { courses });
    } catch (err) {
        res.status(404).json({
            status: "fail", 
            message: err
        });
    }
};