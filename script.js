let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let creat = document.getElementById("submit");
let deletAll = document.getElementById("deletAll");
let mood = "Creat";
let tmp;

function getTotal() {
  if (price.value.length !== 0) {
    let TotalWithoutDis = +price.value + +taxes.value + +ads.value;
    total.innerHTML = TotalWithoutDis - +discount.value;
    total.style.backgroundColor = "#040";
    total.classList.remove("animation");
  } else {
    total.classList.remove("animation");
    total.innerHTML = "";
    total.style.backgroundColor = "rgb(0, 187, 255)";
  }
  if (+total.innerHTML < 0) {
    total.classList.add("animation");
    total.style.backgroundColor = "red";
  }
}

let productData = localStorage.getItem("productData")
  ? JSON.parse(localStorage.getItem("productData"))
  : [];

creat.onclick = function () {
  if (title.value.trim() === "") return;

  let singleProduct = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };

  if (mood === "Creat") {
    if (+singleProduct.count > 1) {
      for (let i = 0; i < +singleProduct.count; i++) {
        productData.push(singleProduct);
      }
    } else {
      productData.push(singleProduct);
    }
  } else {
    productData[tmp] = singleProduct;
    mood = "Creat";
    creat.innerHTML = "Creat";
    count.style.display = "block";
  }

  localStorage.setItem("productData", JSON.stringify(productData));
  clearInputs();
  showData();
};

function clearInputs() {
  let allInputs = document.querySelectorAll("input");
  allInputs.forEach((input) => (input.value = ""));
  total.innerHTML = "";
  total.style.backgroundColor = "rgb(0, 187, 255)";
}

function showData() {
  let table = "";
  for (let i = 0; i < productData.length; i++) {
    table += `
      <tr>
        <td>${i + 1}</td>
        <td>${productData[i].title}</td>
        <td>${productData[i].price}</td>
        <td>${productData[i].taxes}</td>
        <td>${productData[i].ads}</td>
        <td>${productData[i].discount}</td>
        <td>${productData[i].total}</td>
        <td>${productData[i].category}</td>
        <td><button onclick="updateData(${i})">update</button></td>
        <td><button onclick="deleteData(${i})">delete</button></td>
      </tr>
    `;
  }
  document.getElementById("tbody").innerHTML = table;

  if (productData.length > 1) {
    deletAll.style.display = "block";
  } else {
    deletAll.style.display = "none";
  }
}
showData();

deletAll.onclick = function () {
  localStorage.removeItem("productData");
  productData = [];
  document.getElementById("tbody").innerHTML = "";
  deletAll.style.display = "none";
};

function deleteData(index) {
  productData.splice(index, 1);
  localStorage.setItem("productData", JSON.stringify(productData));
  showData();
}

function updateData(index) {
  title.value = productData[index].title;
  price.value = productData[index].price;
  taxes.value = productData[index].taxes;
  ads.value = productData[index].ads;
  discount.value = productData[index].discount;
  category.value = productData[index].category;
  getTotal();
  count.style.display = "none";
  mood = "Update";
  tmp = index;
  creat.innerHTML = "Update";
  scroll({ top: 0, behavior: "smooth" });
}
