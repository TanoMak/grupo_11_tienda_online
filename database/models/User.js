module.exports = (sequelize, dataTypes) => {

    let alias = 'User';

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: dataTypes.STRING
        },
        lastname: {
            type: dataTypes.STRING
        },
        email: {
            type: dataTypes.STRING
        },
        address: {
            type: dataTypes.STRING
        },
        profile_photo: {
            type: dataTypes.STRING
        },
        phone: {
            type: dataTypes.STRING
        },
        password :{
            type: dataTypes.STRING
        }
    
    };
    
    let config = {
        timestamps: true,
        tableName: 'users',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        paranoid : true
    };

    
    const User = sequelize.define(alias, cols, config);

/*     User.associate = function(models){
        User.hasMany(models.ProductCart, {
            as: "ProductCarts",
            foreignKey: "user_id",            
        });
    }
 */

    return User;
};