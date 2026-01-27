const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use("/uploads",express.static("uploads"));

mongoose.connect("mongodb://localhost:27017/officeworkDB").then(() => {console.log("database connected")}).catch((err) => {console.log("error in connecting");
});


const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`);
});