// npm i ejs 
const ejs = require("ejs");

exports.test = async (req, res) => {
    try {
        res.render("test", { pageTitle: "Тест за backend развој на софтвер" });
    } catch (err) {
        res.status(404).json({
            status: "fail", 
            message: err
        });
    }
};