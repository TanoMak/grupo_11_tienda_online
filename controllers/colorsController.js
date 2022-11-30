const db = require('../database/models');
const sequelize = db.sequelize;

const colorsController = {
    
    list: function(req, res) {
        db.Color.findAll()
        .then(function(colors){
            res.render("colors", {colors})
        })
    },

    create: function (req, res) {
        res.render("colorsForm");
    },

    store: function (req, res) {
        let newColor = {
            name: req.body.name
            //codigo hexadecimal
        }

        db.Color.create(newColor)
        .then(function(){
            res.redirect("/colors");
        })
    },
    
    edit: function(req, res){
        db.Color.findByPk(req.params.id)
        .then(function(color){
            res.render("colorsForm", {color})
        })
    },

    update: function(req, res) {
        let editColor = {
            name: req.body.name
            //codigo hexadecimal
        }

        db.Color.update(editColor, {
            where:{
                id: req.params.id,   
            }
        })
        .then(function(){
            res.redirect("/colors");
        })

    },

    destroy: function(res, res) {

        db.Color.destroy({
            where:{
                id: req.params.id
            }
        })
        .then(function(){
            res.redirect("/colors");
        })

    }

};

module.exports = colorsController;