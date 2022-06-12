const mongoose = require("mongoose");

async function connectDb() {
    await mongoose.connect("mongodb://localhost:27017/shopping")
} 

connectDb()
    .then(() => {
        console.log("Connection Successful")
    })
    .catch(err => console.log(err))

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  onSale: {
    type: Boolean,
    default: false,
  },
  categories: [String],
  qty: {
    online: {
      type: Number,
      default: 0,
    },
    inStore: {
      type: Number,
      default: 0,
    },
  },
});

// * Instance Methods
productSchema.methods.addCategory = function (newCat) {
    this.categories.push(newCat); // 'this' reffers to the instance
    return this.save();
  };
  
productSchema.methods.toggleOnSale = function () {
    this.onSale = !this.onSale;
    return this.save();
};

// * Static Method
productSchema.statics.fireSale = async function () {
    return await this.updateMany({}, { onSale: true, price:1 }); // Sets all products on Sale
}

const Products = mongoose.model("Products", productSchema);

// * Adding products to database
Products.insertMany([
    { name: "Dairy Milk", price: 7, onSale: true, categories: ["Kit Kat", "Munch", "Nestle"], qty: { online: 7, inStore: 9 } },
    { name: "Soda", price: 5, onSale: false, categories: ["Coca Cola", "Red Bull", "Gatorade"], qty: { online: 20, inStore: 25 } },
    { name: "Snacks", price: 3, onSale: false, categories: ["Lays", "Doritoz", "Ritz"] }
])
    .then(data => {
        console.log(data)
    })


// * Running Validators before updating
Products.findOneAndUpdate({ name: "Dairy Milk" },{ onSale: false, price: 10 },{ new: true, runValidators: true })
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });


// *  Using Instance Method
const findProduct = async () => {
    let foundProduct = await Products.findOne({ name: "Dairy Milk" });
    await foundProduct.addCategory("Harshey's")
    console.log(foundProduct)
};

findProduct();

// * Initializing Static Method
Products.fireSale()
    .then(res => console.log(res))
    .catch((err) => {
        console.log(err);
      });






  
