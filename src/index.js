const app = require('./app');
const port=app.get('port')
app.listen(port,()=>{
  console.log(`see magic on port ${port}`);
})
