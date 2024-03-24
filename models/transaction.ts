import { Model, DataTypes } from 'sequelize';
import sequelize from './db';
import User from './User';
import TransactionItem from './transactionItem';

interface TransactionAttributes {
    customer_id: number;
    total_price: number;
    createdAt: Date;
}

class Transaction extends Model<TransactionAttributes> implements TransactionAttributes {
    public customer_id!: number;
    public total_price!: number;
    public createdAt!: Date;
}

Transaction.init({
    customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    total_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, {
    sequelize,
    modelName: 'Transaction',
});

//Transaction.belongsTo(User, { foreignKey: 'customer_id' });
//Transaction.hasMany(TransactionItem, { foreignKey: 'transaction_id' });

export default Transaction;
