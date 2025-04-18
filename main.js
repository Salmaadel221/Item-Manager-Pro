const checkbox = document.getElementById("checkbox");
checkbox.addEventListener("change", () => {
  document.body.classList.toggle("dark");
  document.querySelector(".crud .head h2").classList.toggle("dark");
  document.querySelector(".dleteall").classList.toggle("dark");
  document.querySelector("#submit").classList.toggle("dark");
  document.querySelectorAll("input").forEach((input) => {
    input.classList.toggle("dark");
  });
  document.querySelectorAll("td").forEach((td) => {
    td.classList.toggle("dark");
  });
  document.querySelectorAll("th").forEach((th) => {
    th.classList.toggle("dark");
  });
});

let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let creat = document.querySelector(".submit");
let update = document.querySelectorAll("#update");
let deletee = document.querySelectorAll("#delete");
let deletAll = document.querySelector(".dleteall");
let search = document.querySelector("#search");
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
  if (total.innerHTML < 0) {
    total.classList.add("animation");
    total.style.backgroundColor = "red";
  }
}

let productData;
if (localStorage.getItem("productData") !== null) {
  productData = JSON.parse(localStorage.getItem("productData"));
} else {
  productData = [];
}
creat.onclick = function creatElement() {
  let singleProudct = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };
  if (
    title.value.trim() &&
    price.value.trim() &&
    category.value.trim() !== "" &&
    count.value <= 100
  ) {
    if (mood === "Creat") {
      if (singleProudct.count > 1) {
        for (let i = 0; i < singleProudct.count; i++) {
          productData.push(singleProudct);
        }
      } else {
        productData.push(singleProudct);
      }
    } else {
      productData[tmp] = singleProudct;
      creat.innerHTML = "creat";
      count.style.display = "block";
    }
    clearInputs();
  } else {
  }

  window.localStorage.setItem("productData", JSON.stringify(productData));

  showData();
};

function clearInputs() {
  let allInpts = document.querySelectorAll("input");
  allInpts.forEach((input) => {
    input.value = "";
  });
  total.innerHTML = "";
  total.style.backgroundColor = "rgb(0, 187, 255)";
}

function showData() {
  let table = "";
  let tbody = document.getElementById("tbody");
  for (let i = 0; i < productData.length; i++) {
    table += `
     <tr id="tr">
              <td>${i + 1}</td>
              <td>${productData[i].title}</td>
              <td>${productData[i].price}</td>
              <td>${productData[i].taxes}</td>
              <td>${productData[i].ads}</td>
              <td>${productData[i].discount}</td>
              <td>${productData[i].total}</td>
              <td>${productData[i].category}</td>
              <td><button onclick="updateData(${i})" id="update">update</button></td>
              <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
              </tr>
              `;
    tbody.innerHTML = table;
  }
  if (productData.length > 1) {
    deletAll.style.display = "block";
  } else {
    deletAll.style.display = "none";
  }
  deletAll.onclick = function () {
    localStorage.removeItem("productData");
    productData = [];
    tbody.innerHTML = "";
    deletAll.style.display = "none";
  };
  deletAll.textContent = `Delete All (${+productData.length})`;
}
showData();

function deleteData(indexofElement) {
  productData.splice(indexofElement, 1);
  localStorage.productData = JSON.stringify(productData);
  showData();
}

function updateData(element) {
  title.value = productData[element].title;
  price.value = productData[element].price;
  taxes.value = productData[element].taxes;
  ads.value = productData[element].ads;
  discount.value = productData[element].discount;
  category.value = productData[element].category;
  getTotal();

  count.style.display = "none";

  scroll({ top: 0, behavior: "smooth" });
  mood = "Update";
  tmp = element;
  creat.innerHTML = "Update";
}



let searchMood = "title";
function getSearchMood(id) {

  if (id === "searchTitle") {
    searchMood = "title";
  } else {
    searchMood = "category";
  }
  search.placeholder = `Search by ${searchMood}`;

  search.focus();
  search.value = "";
  showData();
}

function searchData(value) {
  let table = "";
  let tbody = document.getElementById("tbody");
  for (let i = 0; i < productData.length; i++) {
    if (searchMood == "title") {
      if (productData[i].title.includes(value)) {
        table += `
     <tr id="tr">
              <td>${i + 1}</td>
              <td>${productData[i].title}</td>
              <td>${productData[i].price}</td>
              <td>${productData[i].taxes}</td>
              <td>${productData[i].ads}</td>
              <td>${productData[i].discount}</td>
              <td>${productData[i].total}</td>
              <td>${productData[i].category}</td>
              <td><button onclick="updateData(${i})" id="update">update</button></td>
              <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
              </tr>
              `;
      }
    } else {
      if (productData[i].category.includes(value)) {
        table += `
     <tr id="tr">
              <td>${i + 1}</td>
              <td>${productData[i].title}</td>
              <td>${productData[i].price}</td>
              <td>${productData[i].taxes}</td>
              <td>${productData[i].ads}</td>
              <td>${productData[i].discount}</td>
              <td>${productData[i].total}</td>
              <td>${productData[i].category}</td>
              <td><button onclick="updateData(${i})" id="update">update</button></td>
              <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
              </tr>
              `;
      }
    }
  }
  tbody.innerHTML = table;
}
