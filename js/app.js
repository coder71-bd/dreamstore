const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};

loadProducts();

const loadSingleProduct = (url) => {
  fetch(url)
    .then((res) => res.json())
    .then((data) => console.log(data));
};

// show all product in UI
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const {
      rating: { rate, count },
    } = product;
    const singleItemURL = `https://fakestoreapi.com/products/${product.id}`;
    const image = product.image;
    const div = document.createElement('div');
    div.classList.add('product');
    div.innerHTML = `
    <div class="single-product mx-auto mt-3">
      <div class="single-product__img d-flex justify-content-center">
        <img class="p-3" src="${image}" alt="${product.title}" height="300px" width="80%"/>
      </div>

      <div class="p-3">
        <h4>${product.title}</h4>
        <p>Category: ${product.category}</p>
        <p>Rating: <strong>${rate}</strong></p>
        <p>Rated by <strong>${count}</strong> users</p>
        <h3>Price: $ ${product.price}</h3>

        <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>

        <button onclick="loadSingleProduct('${singleItemURL}')" id="details-btn" class="btn btn-danger ms-2">Details</button>
      </div>
      `;
    document.getElementById('all-products').appendChild(div);
  }
};
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;

  // updated total added products
  document.getElementById('total-Products').innerText = count;

  //update price
  updatePrice('price', price);

  //update tax and delivery charge
  updateTaxAndCharge();

  //upadate total
  updateTotal();
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue('price');
  if (priceConverted > 200) {
    setInnerText('delivery-charge', 30);
    setInnerText('total-tax', priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText('delivery-charge', 50);
    setInnerText('total-tax', priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText('delivery-charge', 60);
    setInnerText('total-tax', priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue('price') +
    getInputValue('delivery-charge') +
    getInputValue('total-tax');
  document.getElementById('total').innerText = grandTotal.toFixed(2);
};
