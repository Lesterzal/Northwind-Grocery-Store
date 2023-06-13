"use strict";

const filterSelect = document.getElementById("filterSelect");
const categoryDropdown = document.getElementById("categoryDropdown");
const productTable = document.getElementById("productTable");
const productTableBody = document.getElementById("productTableBody");

window.onload = function () {
  filterSelect.onchange = handleSelectChange;
  categoryDropdown.onchange = handleCategorySelection;
};

function handleSelectChange() {
  const value = filterSelect.value;

  if (value === "searchByCategory") {
    categoryDropdownSelect(categoryDropdown);
    categoryDropdown.style.display = "block";
  } else if (value === "viewAll") {
    clearTable(productTableBody);
    categoryDropdown.style.display = "none";
    productTable.style.display = "block";
    fetchProducts("http://localhost:8081/api/products");
  } else if (value === "selectOne") {
    categoryDropdown.style.display = "none";
    productTable.style.display = "none";
  }
}

function categoryDropdownSelect(select) {
  select.innerHTML = "";
  select.add(new Option("Select a category", "select"));
  fetchCategories("http://localhost:8081/api/categories", select);
}

function fetchCategories(url, select) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      for (let x of data) {
        select.add(new Option(x.name, x.categoryId));
      }
    });
}

function fetchProducts(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      clearTable(productTableBody);
      for (let x of data) {
        if (filterSelect.value === "viewAll" || categoryDropdown.value === x.categoryId) {
          createTableRow(x);
        }
      }
    });
}

function handleCategorySelection() {
  clearTable(productTableBody);

  if (categoryDropdown.value === "select") {
    productTable.style.display = "none";
  } else {
    productTable.style.display = "block";
    fetchProducts("http://localhost:8081/api/products");
  }
}

function createTableRow(product) {
  let row = productTableBody.insertRow(-1);
  let cell1 = row.insertCell(0);
  let cell2 = row.insertCell(1);
  let cell3 = row.insertCell(2);
  cell1.innerHTML = `<a href="/details-page/details.html?productId=${product.productId}">${product.productName}</a>`;
  cell2.innerHTML = `$${parseFloat(product.unitPrice).toFixed(2)}`;
  cell3.innerHTML = product.productId;
}

function clearTable(table) {
  table.innerHTML = "";
}

