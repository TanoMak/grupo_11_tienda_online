const { validationResult } = require('express-validator');
const fs = require("fs");
const path = require("path");
const bcrypt = require ("bcryptjs")


function findAll() {
    const jsonData = fs.readFileSync(
      path.join(__dirname, "../data/users.json")
    );
    const data = JSON.parse(jsonData);
    return data;
  }
  
  function writeFile(data) {
    const dataString = JSON.stringify(data, null, 4);
    fs.writeFileSync(path.join(__dirname, "../data/users.json"), dataString);
  }

module.exports = {
  register: (req, res) =>{
    return res.render ("users/register")
  },

  processRegister: (req, res) => {
		const resultValidation = validationResult(req);
		
		if (resultValidation.errors.length > 0) {
			return res.render("users/register", {
				errors: resultValidation.mapped(),
				oldData: req.body
			});
		}else{
      const data = findAll();
    
      const newUser = {
        id: data.length+1,
        name: req.body.name,
        lastName: req.body.lastName,
        phone:Number(req.body.phone),
        email: req.body.emial,
        adress: req.body.adress,
        password: req.body.password,
        imageUser: req.file.filename
      }

      let password = req.body.password
      let passwordEncriptada = bcrypt.hashSync(password, 10)


    
      data.push(newUser);
    
      console.log(newUser)
        
      writeFile(data);
        
      res.redirect("/users/login");
    }
  },

  login: (req, res) => {
		return res.render('users/login');
  }
}