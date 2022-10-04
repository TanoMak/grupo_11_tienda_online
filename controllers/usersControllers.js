const { validationResult } = require('express-validator');

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
		}

		res.send ("users/login")
    }
}