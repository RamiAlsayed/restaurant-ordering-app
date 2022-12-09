const menuArray = [
  {
    name: 'Pizza',
    ingredients: ['pepperoni', 'mushrom', 'mozarella'],
    id: 0,
    price: 14,
    emoji: '🍕',
  },
  {
    name: 'Hamburger',
    ingredients: ['beef', 'cheese', 'lettuce'],
    price: 12,
    emoji: '🍔',
    id: 1,
  },
  {
    name: 'Sushi',
    ingredients: ['Sashimi, Chirashi, Temaki, Uramaki'],
    price: 11,
    emoji: '🍣',
    id: 2,
  },
];

const menuList = document.querySelector('.menuList');
const orderList = document.querySelector('.orderList');
const order = document.querySelector('#order');
const totalPrices = document.querySelector('.totalPrices');
const greenBtn = document.querySelector('.green-btn');
const form = document.querySelector('.form');
const closeX = document.querySelector('.closeForm');
const loginForm = document.querySelector('#login-form');
const sumForm = document.querySelector('.sumForm');
const payBtn = document.querySelector('.pay-btn');
const finalMassage = document.querySelector('.final-massage');
const formBox = document.querySelector('.formBox');

// render menuArray
function render() {
  menuArray.forEach((menu) => {
    let domHTML = `
        <h3  class="menuName"><span>${menu.emoji}</span>${menu.name}<span id="plus"><i class="fa-duotone fa-plus " data-food="${menu.id}" data-price="${menu.price}"></i></span></h3>
        <p>${menu.ingredients}</p>
        <h3 class="price">$${menu.price}</h3>

    
    
    `;
    menuList.innerHTML += domHTML;
  });
}

render();

// Add order Function

function addOrder() {
  menuArray.forEach((menu) => {
    document.addEventListener('click', (e) => {
      // ADD ORDER LIST
      let domOrder = ``;
      let orderArr = [];
      if (Number(e.target.dataset.food) === menu.id) {
        order.style.display = 'block';

        domOrder = `
        
            <div class="col ">
            <button  data-remove="${menu.id}"  data-price="${menu.price}" class="btn remove ">remove</button>
              <h3>${menu.name}</h3> 
               <h3 >$${menu.price}</h3>
                      
            </div>
            <br>
        

        `;

        orderArr.push(domOrder);

        orderList.innerHTML += orderArr;
      }
    });
  });
}
addOrder();

// sum item...
let sumArr = [];
let sum;

function sumItems() {
  menuArray.forEach((menu) => {
    document.addEventListener('click', (e) => {
      if (Number(e.target.dataset.food) === menu.id) {
        sumArr.push(menu.price);
      }

      sum = sumArr.reduce((partialSum, a) => partialSum + a, 0);

      let priceOrder = `

   <h3>Total Price:</h3>
   <h3>$${sum}</h3>
     
 `;

      totalPrices.innerHTML = priceOrder;
    });
  });
}

sumItems();

// Remove item from cart

function removeItem() {
  menuArray.forEach((menu) => {
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('remove')) {
        e.target.parentElement.remove();

        if (Number(e.target.dataset.remove) == menu.id) {
          for (let i = 0; i <= sumArr.length; i++) {
            if (sumArr[i] === Number(e.target.dataset.price)) {
              console.log(sumArr[i]);
              sumArr.splice(i, 1);
              break;
            }
          }

          //New Sum after item remove...
          sum = sumArr.reduce((partialSum, a) => partialSum + a, 0);

          let priceOrder = `
    
       <h3>Total Price:</h3>
        <h3>$${sum}</h3>
       
    `;
          // refresh page

          if (sum === 0) {
            return location.reload();
          }

          totalPrices.innerHTML = priceOrder;
        }
      }
    });
  });
}

removeItem();

// Pay order function

greenBtn.addEventListener('click', () => {
  if (sum > 0) {
    form.style.display = 'block';
    let totalSumForm = `
      <p class="sumP">Total you pay: $${sum}</p>
    `;
    sumForm.innerHTML = totalSumForm;
  }
});
// close form

closeX.addEventListener('click', () => {
  form.style.display = 'none';
});

// set timeOut function

//set e.preventDefault() to the form

loginForm.addEventListener('submit', (e) => {
  const nameInput = document.querySelector('.name-input').value;
  e.preventDefault();
  let message = `
  <p class="text-message">Thank you ${nameInput} ! , You order on the way!</p>
  
  `;
  formBox.style.display = 'none';
  finalMassage.innerHTML = message;
  setTimeout(function timeOut() {
    return location.reload();
  }, 5000);
});
