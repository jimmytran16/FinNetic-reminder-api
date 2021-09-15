const app = require('./server')
const port = process.env.PORT || 4001;
app.listen(port, () => console.log(`Connection to PORT ${ port }`));
