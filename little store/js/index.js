let $ = document
const productContainer = $.querySelector('.container')
const basketcontainer = $.querySelector('.basket-products')
const paginationContainer = $.querySelector('.pagination-btn')
const totalPrice = $.querySelector('.total-price')
const clearBtn = $.querySelector('.clear-btn')

let allProducts = [
    {id: 1  , title: "code(1)"  , price: 98.03  , src: "./images/pic1.jpg" , count: 1},
    {id: 2  , title: "code(2)"  , price: 64.03  , src: "./images/pic2.jpg" , count: 1},
    {id: 3  , title: "code(3)"  , price: 54.05  , src: "./images/pic3.jpg" , count: 1},
    {id: 4  , title: "code(4)"  , price: 62.11  , src: "./images/pic4.jpg" , count: 1},

    {id: 5  , title: "code(5)"  , price: 49.01  , src: "./images/pic7.jpg" , count: 1},
    {id: 6  , title: "code(6)"  , price: 29.99  , src: "./images/pic6.jpg" , count: 1},
    {id: 7  , title: "code(7)"  , price: 35.43  , src: "./images/pic5.jpg" , count: 1},
    {id: 8  , title: "code(8)"  , price: 78.02  , src: "./images/pic8.jpg" , count: 1},

    {id: 9  , title: "code(9)"  , price: 89.99  , src: "./images/pic9.jpg" , count: 1},
    {id: 10  , title: "code(10)"  , price: 47.98  , src: "./images/pic10.jpg" , count: 1},
    {id: 11  , title: "code(11)"  , price: 87.04  , src: "./images/pic11.jpg" , count: 1},
    {id: 12  , title: "code(12)"  , price: 58.16  , src: "./images/pic12.jpg" , count: 1},

    {id: 13  , title: "code(13)"  , price: 89.09  , src: "./images/pic13.jpg" , count: 1},
    {id: 14  , title: "code(14)"  , price: 58.03  , src: "./images/pic14.jpg" , count: 1},
    {id: 15  , title: "code(15)"  , price: 78.06  , src: "./images/pic15.jpg" , count: 1},
    {id: 16  , title: "code(16)"  , price: 68.33  , src: "./images/pic16.jpg" , count: 1},

    {id: 17  , title: "code(17)"  , price: 97.04  , src: "./images/pic17.jpg" , count: 1},
    {id: 18  , title: "code(18)"  , price: 93.78  , src: "./images/pic18.jpg" , count: 1},
    {id: 19  , title: "code(19)"  , price: 75.09  , src: "./images/pic19.jpg" , count: 1},
    {id: 20  , title: "code(20)"  , price: 65.34  , src: "./images/pic20.jpg" , count: 1},
];


let userBasket = []


let currentPage = 1;
let rowsCount = 6 ;

let displayProducts = (allProductsArray , productContainer , rows , page) => {
    
    productContainer.innerHTML = ''

    let end = rows * page
    let start = end - rows

    let paginatedProduct =  allProductsArray.slice(start , end)

    paginatedProduct.forEach( product => {
        productContainer.insertAdjacentHTML('beforeend' , `<div class="shop-item"> <span class="product-title">${product.title}</span><img  class="product-img"  src="${product.src}" alt="clouth-img"><div class="product-detaile"><span class="product-price">${product.price + "  $"}</span><button class="product-btn" onClick=" addToBasketHandler(${product.id})">add to basket </button></div></div>`)
    })
}


let setUpPagination  =  (allProductsArray , pagesContainer , rows ) => {

    pagesContainer.innerHTML = '' 

    let pageCount = Math.ceil(allProductsArray.length / rows)

    for ( let i = 1 ; i < pageCount + 1 ; i++) {
        let btn = paginationButtonGenerator( i , allProductsArray)
        paginationContainer.appendChild(btn)
    }
}

let paginationButtonGenerator = ( page , allProductsArray ) => {

    let button  =  $.createElement('button')
    button.innerHTML = page

    if (page === currentPage) {
        button.classList.add('active')
    }

    button.addEventListener('click' , () => {
        
        currentPage = page 

        displayProducts(allProductsArray , productContainer , rowsCount , currentPage)

        let prevPage = document.querySelector('button.active')
        prevPage.classList.remove('active')

        button.classList.add('active')

        window.scroll(0 , 500)
    })
    return button
}

displayProducts( allProducts , productContainer , rowsCount , currentPage)
setUpPagination(allProducts , paginationContainer , rowsCount)

////////////////////////   end pagination  /////////////////////////



let addToBasketHandler = (productID) => {

    let mainProduct = allProducts.find(product => {
        return product.id === productID
    })

    userBasket.push(mainProduct)
    addToBasketGenerator(userBasket)
    calcTotalPrice(userBasket)
}


let addToBasketGenerator = userBasket => {

    basketcontainer.innerHTML = ''

    userBasket.forEach( product => {

        basketcontainer.insertAdjacentHTML('beforeend' , `<div class="basket-row">
        <div class="basket-item basket-column ">
            <img  class="basket-img" src="${product.src}" alt="clouth-img">
            <span class="basket-title">${product.title}</span>
             <span class="basket-price">${product.price}</span>
             <input class="basket-num" type="number" value="${product.count}" onChange=" updateBasketPrice(${product.id})">
             <button class="basket-del-btn" onClick=" removeProductFromBasket(${ product.id}) ">claer product</button>
        </div>`)
    })
}


let removeProductFromBasket = (productID) => {
    
    userBasket = userBasket.filter(product => {
        return product.id !== productID
    })
    addToBasketGenerator(userBasket)
    calcTotalPrice(userBasket)
}


let calcTotalPrice = userBasket => {

    let totalPriceValue = 0;

    userBasket.forEach(product => {
        totalPriceValue += product.price * product.count
    })

    totalPrice.innerHTML = totalPriceValue + "  $"
}

clearBtn.addEventListener('click' , () => {
    userBasket = []
    addToBasketGenerator(userBasket)
    calcTotalPrice(userBasket)
})
//  there`s a bug :( 
let updateBasketPrice = (productID) => {
    let inputElem = $.querySelector('.basket-item input')
    
    userBasket.forEach(product => {
        if (product.id === productID) {
            product.count = inputElem.value
        }
        calcTotalPrice(userBasket)
    })
}