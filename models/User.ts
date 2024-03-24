import { Model, DataTypes } from 'sequelize';
import sequelize from './db'; 
import Transaction from './transaction';

interface UserAttributes {
    username: string;
    email: string;
    password: string;
    role: 'admin' | 'user';
    isVerified: boolean;
    verificationCode: string | null; // Adjusted data type for MySQL compatibility
}

class User extends Model<UserAttributes> implements UserAttributes {
    public username!: string;
    public email!: string;
    public password!: string;
    public role!: 'admin' | 'user';
    public isVerified!: boolean;
    public verificationCode!: string | null; // Adjusted data type for MySQL compatibility
}

User.init({
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('admin', 'user'),
        allowNull: false,
        defaultValue: 'user',
    },
    isVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    verificationCode: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    sequelize,
    modelName: 'User',
});

//User.hasMany(Transaction, { foreignKey: 'customer_id' });

export default User;
