const { Sequelize, Model, DataTypes, Op } = require('sequelize');

const sequelize = new Sequelize('farmaRuizdb','root',null,{
  host: '127.0.0.1',
  dialect: 'mysql'
})

let db = {};

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

const User = sequelize.define("user", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    username: {type: DataTypes.TEXT, allowNull: false, unique: true},
    password: DataTypes.TEXT,
    email: {type: DataTypes.TEXT, allowNull: false, unique: true},
    img: DataTypes.TEXT
});

const Product = sequelize.define("product", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.TEXT, allowNull: false, unqiue: true},
    price: DataTypes.INTEGER,
    img: DataTypes.TEXT,
    desc: DataTypes.TEXT,
    maker: DataTypes.TEXT
}, {paranoid: true});

const Compra = sequelize.define("compra", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    cantidad: {type: DataTypes.INTEGER,  allowNull: false}
});

Product.Compra = Product.hasMany(Compra);
User.Compra = User.hasMany(Compra);

db["product"] = Product;
db["user"] = User;
db["compra"] = Compra;

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Op = Op;

(async () => {
  await sequelize.sync({ force: false });

})();

module.exports = db;
