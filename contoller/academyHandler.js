const Academy = require("../model/academy/academySchema");

exports.getAllAcademies = async  (req, res) => {
    try {
        const academies = await Academy.find();
        res.status(200).json({
            status: "success",
            data: {
                academies,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err,
        });
    }
};

exports.getOneAcademy = async (req, res) => {
    try {
        const academy = await Academy.findById(req.params.id);
        res.status(200).json({
            status: "success",
            data: {
                academy,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err,
        });
    }
};

exports.updateAcademy = async (req, res) => {
    try {
        const academy = await Academy.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            status: "success",
            data: {
                academy,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err,
        });
    }
};

exports.deleteAcademy = async (req, res) => {
    try {
        await Academy.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: "success", 
            data: null,
        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err,
        });
    }
};

exports.createAcademy = async (req, res) => {
    try {
        const newAcademy = await Academy.create(req.body);
        res.status(201).json({
            data: {
            academy: newAcademy,
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
        const academy = await Academy.create({
            name: req.body.name,
            address: req.body.address,
            author: req.auth.id,
        });
        res.status(201).json(academy);
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err,
        });
    }
};

exports.getByUser = async (req, res) => {
    try {
        const academies = await Academy.find({ author: req.auth.id });
        res.status(201).json(academies);
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err,
        });
    }
};