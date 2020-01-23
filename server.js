const express = require('express');
const morgan = require('morgan')
const app = express();

app.use(morgan('tiny'))
const PORT = process.env.PORT || 5000


app.get('/',(req,res)=>{
    res.json({msg:"app test"})
})


app.listen(PORT , () => {
    console.log('App listening on port ',PORT);
});

