const connectTomongo = require('./db');
const express = require('express')
connectTomongo();

const port = 5000
var cors = require('cors') //it is imported and use for using api internally in a project

const app = express();
app.use(express.json());
app.use(cors());//Implementing cors

app.use('/app/mms/backend/reservation',require('./Routes/Reservation'));
app.use('/app/mms/backend/customer',require('./Routes/Customer'));
app.use('/app/mms/backend/admin',require('./Routes/Admin'));
app.use('/app/mms/backend/employees',require('./Routes/Employee'));
app.use('/app/mms/backend/employees/roles',require('./Routes/EmpRoles'));
app.use('/app/mms/backend/inventory',require('./Routes/Inventory'));
app.use('/app/mms/backend/event',require('./Routes/Event'));
app.use('/app/mms/backend/expense',require('./Routes/Expense'));


app.listen(port, () => {
  console.log(`MMS server listening on localhost:${port}`)
});