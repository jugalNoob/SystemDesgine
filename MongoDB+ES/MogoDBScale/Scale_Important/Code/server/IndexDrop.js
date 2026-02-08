const mongoose = require('mongoose');
const RegisterGet = require("./model/student");
(async () => {
  try {
    await mongoose.connect('mongodb+srv://jugal786:jugal786@cluster0.sgg8t.mongodb.net/ones?retryWrites=true&w=majority');
    const resultz = await RegisterGet.collection.getIndexes();
    console.log(resultz)
    const result = await RegisterGet.collection.dropIndexes('price_1');
    console.log("All indexes dropped:", result);
    
    await mongoose.disconnect();
  } catch (error) {
    console.error("Error dropping indexes:", error);
  }
})();
