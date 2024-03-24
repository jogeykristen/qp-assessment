import { Model, DataTypes } from 'sequelize';
import sequelize from './db';
import Transaction from './transaction';
import GroceryItem from './GroceryItem';

interface TransactionItemAttributes {
    transaction_id: number;
    product_id: number;
    quantity: number;
}

class TransactionItem extends Model<TransactionItemAttributes> implements TransactionItemAttributes {
    public transaction_id!: number;
    public product_id!: number;
    public quantity!: number;
}

TransactionItem.init({
    transaction_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Transaction,
            key: 'id',
        },
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: GroceryItem,
            key: 'id',
        },
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'TransactionItem',
});

export default TransactionItem;
