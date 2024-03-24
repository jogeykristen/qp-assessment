import { Model, DataTypes } from 'sequelize';
import sequelize from './db';
import TransactionItem from './transactionItem';

interface GroceryItemAttributes {
    name: string;
    price: number;
    quantity: number;
}

class GroceryItem extends Model<GroceryItemAttributes> implements GroceryItemAttributes {
    public name!: string;
    public price!: number;
    public quantity!: number;
}

GroceryItem.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'GroceryItem',
});

//GroceryItem.hasMany(TransactionItem, { foreignKey: 'product_id' });

export default GroceryItem;
