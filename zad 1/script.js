var PRODUCTLIST = []; //zmienna globalna

fetch("https://dummyjson.com/products")
  // przekształca odpowiedź serwera (która jest w formie tekstu)
  //   na obiekt JavaScript przy użyciu metody .json()
  .then(function (response) {
    return response.json();
  })
  //przepisanie danych do nowej zmiennej GLOBALNEJ
  .then(function (data) {
    PRODUCTLIST = data.products;
    addToMain(data.products);
  })
  //obsluga bledow
  .catch(function (err) {
    console.log("Błąd strumienia danych: " + err);
  });

function addToMain(productList) {
  //z czyszczeniem

  var mainContainer = document.getElementById("main-box");
  mainContainer.innerHTML = "";

  //iteruje przez kazdy produkt w dostarczonych danych
  productList.forEach(function (product) {
    //tworzenie po kolei obiektow i ich uzupelnianie
    var productDiv = document.createElement("div");
    productDiv.classList.add("product");

    var productInfo = document.createElement("div");
    productInfo.classList.add("product-info");

    var productName = document.createElement("h3");
    productName.textContent = product.title;

    var productDescription = document.createElement("p");
    productDescription.textContent = product.description;

    var productPrice = document.createElement("p");
    productPrice.textContent = product.price + " zł";
    productPrice.classList.add("price-style");

    var productImage = document.createElement("img");
    productImage.src = product.thumbnail;
    productImage.alt = product.title;

    //spinanie wszytskiego do kupy i dziedziczenia
    productInfo.appendChild(productName);
    productInfo.appendChild(productDescription);
    productInfo.appendChild(productPrice);

    productDiv.appendChild(productImage);
    productDiv.appendChild(productInfo);

    mainContainer.appendChild(productDiv);
  });
}

function sortProducts() {
  var sortOption = document.getElementById("sortSelect").value;
  addToMain(sorted(PRODUCTLIST, sortOption));
}

function sorted(products, sortOption) {
  if (sortOption === "asc") {
    return products.slice().sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortOption === "desc") {
    return products.slice().sort((a, b) => b.title.localeCompare(a.title));
  }
  return products;
}

function searchProducts() {
  var searchValue = document.getElementById("searchInput").value.toLowerCase();
  var filteredProducts = PRODUCTLIST.filter(function (product) {
    return (
      product.title.toLowerCase().includes(searchValue) ||
      product.description.toLowerCase().includes(searchValue)
    );
  });
  addToMain(filteredProducts);
}
