
const products=[
  {id:1,name:"Smart Watch",price:50,image:"https://via.placeholder.com/300"},
  {id:2,name:"Headphones",price:30,image:"https://via.placeholder.com/300"},
  {id:3,name:"Phone Case",price:10,image:"https://via.placeholder.com/300"}
];
let cart=JSON.parse(localStorage.getItem('cart'))||[];
const productsDiv=document.getElementById("products");
const cartItemsDiv=document.getElementById("cart-items");
const totalSpan=document.getElementById("total");
function renderProducts(){
  products.forEach(p=>{
    productsDiv.innerHTML += `
      <div class="product">
        <img src="${p.image}">
        <h3>${p.name}</h3>
        <p>$${p.price}</p>
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
    cartItemsDiv.innerHTML += `<div class="cart-item">${item.name} x ${item.qty} - $${item.price*item.qty}<button onclick="removeFromCart(${item.id})">حذف</button></div>`;
  });
  totalSpan.textContent=total;
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
  cart.forEach(i=>{msg+=`- ${i.name} x ${i.qty} : $${i.price*i.qty}%0A`;total+=i.price*i.qty;});
  msg+=`%0A💰 المجموع: $${total}%0A🚚 الدفع عند الاستلام`;
  window.open("https://wa.me/212671603159?text="+msg,"_blank");
}
renderProducts();
renderCart();