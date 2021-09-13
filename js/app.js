/* LOAD THE PRODUCTS FORM API */
const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};

loadProducts();

/* SHOW THE CARD IMAGE */
const showCardImg = (img, title) => {
  return `
    <div class="single-product__img d-flex justify-content-center">
        <img class="py-3" src="${img}" alt="${title}" height="300px" width="80%"/>
    </div>
  `;
};

/* SHOW RATING WITH ICON */
const showRatingWithIcon = (rate) => {
  if (!rate) {
    return '';
  }

  const starNumber = Math.round(rate);
  const starsArr = [];

  //yellow stars
  for (let i = 0; i < starNumber; i++) {
    starsArr.push(
      `<span class="material-icons" style="color: yellow">star_rate</span>`
    );
  }

  //gray stars
  for (let i = 0; i < 5 - starNumber; i++) {
    starsArr.push(
      `<span class="material-icons" style="color: gray">star_rate</span>`
    );
  }

  const stars = starsArr.join('');

  return `
    <p class="d-flex align-items-center"><strong class="me-2">Rating: ${rate}</strong> ${stars}</p>
  `;
};

/* SHOW THE CARD INFO */
const showCardInfo = (title, category, rate, count, price) => {
  return `<h4>${title ? title : ''}</h4>
  <p>Category: ${category ? category : 'all'}</p>
  ${showRatingWithIcon(rate)}
  <p>Rated by <strong>${count ? count : 0}</strong> users</p>
  <h3 class="mb-3">Price: $ ${price ? price : 'coming soon'}</h3>`;
};

/* SHOW ALL PRODUCTS IN UI */
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);

  allProducts.forEach((product) => {
    const {
      rating: { rate, count },
      image,
    } = product;

    // create an element to store the card info
    const div = document.createElement('div');
    div.classList.add('single-product', 'my-3');

    div.innerHTML = `
      ${showCardImg(image, product.title)}
      <div class="p-3">
        ${showCardInfo(
          product.title,
          product.category,
          rate,
          count,
          product.price
        )}

        <button 
          onclick="addToCart(${product.price})" 
          id="addToCart-btn" 
          class="buy-now btn btn-success">
          add to cart
        </button>

        <button
          id="details-btn" 
          class="btn btn-danger ms-2">
          Details
        </button>
      </div>
      `;
    document.getElementById('all-products').appendChild(div);
  });
};

/* TOTAL ADDED-PRODUCTS IN MY CART */
let count = 0;

/* ADD ITEM TO THE CART AND UPDATE PRICE ACCORDINGLY */
const addToCart = (price) => {
  count++;

  // updated total added products
  document.getElementById('total-Products').innerText = count;

  //update price
  updatePrice('price', price);

  //update tax and delivery charge
  updateTaxAndCharge();

  //upadate total
  updateTotal();
};

/* GET THE VALUE OF AN ELEMENT WITH THE GIVEN ID */
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

/* UPDATE PRICE IN MY CART */
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

/* UPDATE DELIVERY CHARGE AND TAX IN UI */
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};

/* DELIVERY CHARGE AND TOTAL TAX UPDATER */
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

/* UPDATE GRAND TOTAL IN UI */
const updateTotal = () => {
  const grandTotal =
    getInputValue('price') +
    getInputValue('delivery-charge') +
    getInputValue('total-tax');

  document.getElementById('total').innerText = grandTotal.toFixed(2);
};
