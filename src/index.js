import './styles/index.sass'
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'

const input = document.querySelector('#order-input')
const btn = document.querySelector('#order-btn')
const content = document.querySelector('.content')
const contentBtn = content.querySelector('.content-btn')
const card = content.querySelector('.card')
const loader = document.querySelector('.loader')

function fetchData(id) {
  loader.style.display = 'inline-block'
  fetch(`https://fakestoreapi.com/products/${id}`)
    .then(res=>res.json())
    .then(json=> {
      card.innerHTML = cardHtml(json)
      content.style.display = 'block'
      loader.style.display = 'none'
    })
    .catch(err => {
      card.innerHTML = `<p class="danger">Ошибка: номер заказа должен состоять только из целых чисел</p>`
      content.style.display = 'block'
      loader.style.display = 'none'
      console.log(err)
    })

}

function cardHtml(json) {
  return `
        <h3 >${json.title}</h3>
        <p><strong>Category:</strong> ${json.category}</p>
        <img src="${json.image}" alt="img" width="300" >
        <p>${json.description}</p>
        <p><strong>Price:</strong> ${json.price} $</p>
        <p><strong>Rating:</strong> ${json.rating.rate}</p>
  `
}


btn.addEventListener('click', () => {
  if (!input.value) {
    input.placeholder = 'Введите номер...'
    input.classList.add('danger')
    return
  }
  input.classList.remove('danger')
  fetchData(+input.value % 20)
  input.placeholder = 'Ваш номер...'
  input.value = ''
})

contentBtn.addEventListener('click', () => {
  content.style.display = 'none'
})