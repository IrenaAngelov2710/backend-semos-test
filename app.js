//* npm i express -  biblioteka za kreiranje na web-serveri i upravuvanje so rutite
const express = require("express");
const db = require("./pkg/db/index");
const jwt = require("express-jwt");
//* npm i cookie-parser
const cookieParser = require("cookie-parser");

//* Handlers
const academyHandler = require("./contoller/academyHandler");
const courseHandler = require("./contoller/courseHandler");
const testHandler = require("./contoller/testHandler");
const allCoursesHandler = require("./contoller/allCoursesHandler");
const authHandler = require("./contoller/authHandler");

//* Inicijalizacija na Express aplikacija
const app = express(); 


//* Postavuvanje na middelware 
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(cookieParser());

//* Povrzuvanje so data baza
db.init();

app.use(jwt.expressjwt({
  algorithms: ["HS256"],
  secret: process.env.JWT_SECRET,
  getToken: (req) => {
      if(req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
          return req.headers.authorization.split(" ")[1];
      }
      if(req.cookies.jwt) {
          return req.cookies.jwt;
      }
      return null;
  }})
  .unless({
      path: ["/api/signup", "/api/login", "/test", "/welcome", "/academies", "/courses"]
  })
);

//* Definiranje na ruti za signup i login
app.post("/api/signup", authHandler.signup);
app.post("/api/login", authHandler.login);

//* Definiranje na ruti za ByUser
app.get("/myacademies", academyHandler.getByUser);
app.post("/myacademy", academyHandler.createByUser);
app.get("/mycourses", courseHandler.getByUser);
app.post("/mycourse", courseHandler.createByUser);

//* Definiranje na ruti za Academy
app.get("/academies", academyHandler.getAllAcademies);
app.get("/academy/:id", academyHandler.getOneAcademy);
app.patch("/academy:id", academyHandler.updateAcademy);
app.delete("/academy:id", academyHandler.deleteAcademy);
app.post("/academy", academyHandler.createAcademy);

//* Definiranje na ruti za Course
app.get("/courses", courseHandler.getAllCourses);
app.get("/course/:id", courseHandler.getOneCourse);
app.patch("/course:id", courseHandler.updateCourse);
app.delete("/course:id", courseHandler.deleteCourse);
app.post("/course", courseHandler.createCourse);

//* Definiranje na ruta za Test
app.get("/test", testHandler.test);

//* Definiranje na ruta za Welcome
app.get("/welcome", allCoursesHandler.allCourses);

//* Startuvanje na serverot
app.listen(process.env.PORT, (err) => {
  if(err){
      return console.log("Couldn't start the service.");
  }
  console.log(`Server started successfully on port ${process.env.PORT}`);
});