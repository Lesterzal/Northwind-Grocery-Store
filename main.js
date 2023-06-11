function getAllProducts () {
    return fetch("http://localhost:8081/api/products")
        .then(response => response.json())
}

window.onload = function () {
    getAllProducts()
    .then(productList => console.log(productList))
}

// Add in details.js file
const params = new URLSearchParams(document.location.search)
const productId = params.get("productId")