const exchangeRate = 10.5; // 1$ = 10.5 درهم

const products=[
  {id:1,name:"RAM DRR4 4 GP Laptop",price:10,image:"https://www.electrozenata.ma/wp-content/uploads/2024/09/Barrette-memoire-RAM-Samsung-M471A1K43EB1-8GB-3200MHZ-DDR4-2.webp",description:"ذاكرة RAM DDR4 4GB للابتوب، أداء ممتاز."},
  {id:2,name:"CLAVIER",price:15,image:"https://pcgamercasa.ma/13162-large_default/the-g-lab-keyz-caesium-tkl-clavier-Pc-Gamer-Casa-maroc.jpg",description:"لوحة مفاتيح للألعاب بجودة عالية."},
  {id:3,name:"Souris Logitech",price:10,image:"https://pcstore.ma/wp-content/uploads/2025/06/SOURIS-GAMER-Logitech-G300s-e1749283663267-300x300.webp",description:"فأرة Logitech مريحة ودقيقة للألعاب."}
];

let cart=JSON.parse(localStorage.getItem('cart'))||[];
const productsDiv=document.getElementById("products");
const cartItemsDiv=document.getElementById("cart-items");
const totalSpan=document.getElementById("total");

function convertPrice(price){
  return (price*exchangeRate).toFixed(2);
}

function renderProducts(){
  productsDiv.innerHTML = '';
  products.forEach(p=>{
    productsDiv.innerHTML += `
      <div class="product">
        <img src="${p.image}">
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <p>${convertPrice(p.price)} درهم</p>
        <button onclick="addToCart(${p.id})">Add to Cart</button>
      </div>`;
  });
}

function saveCart(){localStorage.setItem('cart',JSON.stringify(cart));}

function addToCart(id){
  const product=products.find(p=>p.id===id);
  const existing=cart.find(c=>c.id===id);
  if(existing){existing.qty+=1;} else {cart.push({...product,qty:1});}
  renderCart();saveCart();
}

function removeFromCart(id){
  cart=cart.filter(c=>c.id!==id);
  renderCart();saveCart();
}

function renderCart(){
  cartItemsDiv.innerHTML='';
  let total=0;
  cart.forEach(item=>{
    total+=item.price*item.qty;
    cartItemsDiv.innerHTML += `<div class="cart-item">${item.name} x ${item.qty} - ${convertPrice(item.price*item.qty)} درهم <button onclick="removeFromCart(${item.id})">حذف</button></div>`;
  });
  totalSpan.textContent=total?convertPrice(total):0;
}

function sendWhatsApp(){
  if(cart.length===0){alert("السلة فارغة");return;}
  const name=document.getElementById("name").value;
  const phone=document.getElementById("phone").value;
  const address=document.getElementById("address").value;
  if(!name||!phone||!address){alert("عمر جميع المعلومات");return;}
  
  let msg="🛒 طلب جديد%0A%0A";
  msg+=`👤 الاسم: ${name}%0A📞 الهاتف: ${phone}%0A📍 العنوان: ${address}%0A%0A📦 المنتجات:%0A`;
  let total=0;
  cart.forEach(i=>{
    let subtotal = i.price*i.qty;
    msg+=`- ${i.name} x ${i.qty} : ${convertPrice(subtotal)} درهم%0A`;
    total+=subtotal;
  });
  msg+=`%0A💰 المجموع: ${convertPrice(total)} درهم%0A🚚 الدفع عند الاستلام`;
  window.open("https://wa.me/212671603159?text="+msg,"_blank");
}

renderProducts();
renderCart();
