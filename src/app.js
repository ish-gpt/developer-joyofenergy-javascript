const express = require("express");
const { readingsRouter } = require('./routes/readings'); 
const { pricePlansRouter } = require("./routes/price-plans");

const app = express();
app.use(express.json());

app.use("/readings", readingsRouter);
app.use("/price-plans", pricePlansRouter);

const port = process.env.PORT || 8080;
app.listen(port);

console.log(`🚀 app listening on port ${port}`);
