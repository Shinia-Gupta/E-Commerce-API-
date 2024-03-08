import app from './index.js';
import { connectDB } from './config/connection.js';
app.listen(process.env.PORT,process.env.HOSTNAME,()=>{
    console.log(`server is listening at port ${process.env.PORT}`);
    connectDB();
})
