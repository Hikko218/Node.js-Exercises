const express = 'express';
const app = express();

app.use(express.json());

app.get('/', (res,req)=>{
    res.status(200).json({message:'Hello from server'});
});

app.listen(3000,()=>{
    console.log('Server runs on http://localhost:3000');
});
