import express from 'express';
import bodyParser from 'body-parser';
import groceryRoutes from './routes/groceryRoutes'
import userRoutes from './routes/userRoutes'
import transactionRoutes from './routes/transactionRoutes'
import sequelize from './models/db';

const app = express();

const PORT = process.env.PORT||3000;

app.use(bodyParser.json());

app.use("/grocery",groceryRoutes);
app.use("/user",userRoutes)
app.use("/transaction",transactionRoutes)


sequelize.sync({ alter: true }) // This will create/update tables as necessary
    .then(() => {
        console.log('Database synchronized successfully');
        // Start the server after syncing models with the database
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error synchronizing database:', error);
    });

