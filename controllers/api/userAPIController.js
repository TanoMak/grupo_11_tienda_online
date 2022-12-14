const db = require('../../database/models');


const userApi = {
    allUsers: (req, res) => {
        db.User.findAll()
            .then(users => {
                let newData = users.map(user => {
                    return {
                        id: user.id,
                        name: user.name,
                        lastname: user.lastname,
                        phone: user.phone,
                        email: user.email,
                        address: user.address,
                        profile_photo: user.profile_photo,
                        admin: user.admin,                       
                    }
                })
                let response = {
                    meta: {
                        status: 200,
                        total_users: users.length,
                        url: '/api/users'
                    },
                    data: newData
                }
                res.json(response);
            })
    },
    userDetail: (req, res) => {
        db.User.findByPk(req.params.id)
            .then(user => {
                let jsonUser = {
                    meta: {
                        status: 200,
                        url: '/api/users/' + req.params.id
                    },
                    data: {
                        id: user.id,
                        name: user.name,
                        lastname: user.lastname,
                        phone: user.phone,
                        email: user.email,
                        address: user.address,
                        profile_photo: user.profile_photo,
                        admin: user.admin,                        
                    }
                }
                res.json(jsonUser);

            })

    }
}

module.exports = userApi;