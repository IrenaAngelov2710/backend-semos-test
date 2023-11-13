const User = require("../model/user/userSchema");

//* npm i jsonwebtoken
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
    try {
      //* Kreiranje na nov user
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });

        //* Generiranje na token
        const token = jwt.sign(
            { id: newUser._id, name: newUser.name },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES,
            }
        );

        //* Generiranje na cookies
        res.cookie("jwt", token, {
          expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
          ),
          secure: false,
          httpOnly: true,
    });

        res.status(201).json({
            status: "success",
            token, 
            data: {
                user: newUser,
            },
        });
    } catch (err) {
        res.status(500).send(err)
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
    
        // 1) Proverka dali ima vneseno email i password
        if (!email || !password) {
          return res.status(400).send("Please provide email and password.");
        }
        // 2) Proverka dali korisinkot postoi vo nasata data baza
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(401).send("Invalid email or password!");
        }
    
        // 3) Sporeduvanje na passwordi
        const isPasswordValid = bcrypt.compareSync(password, user.password);
    
        if (!isPasswordValid) {
          return res.status(400).send("Invalid email or password!");
        }
    
        // 4) Generiranje i isprakanje token
        const token = jwt.sign(
          { id: user._id, name: user.name },
          process.env.JWT_SECRET,
          {
            expiresIn: process.env.JWT_EXPIRES,
          }
        );

        //* Isprakanje cookies so token
        res.cookie("jwt", token, {
          expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
          secure: false,
          httpOnly: true
      });
    
        // 5) Pustanje response
        res.status(201).json({ status: 'success', token });
      } catch (err) {
        res.stats(500).send(err);
      } 
};