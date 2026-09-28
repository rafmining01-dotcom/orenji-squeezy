const INSTAGRAM_URL = "https://www.instagram.com/orenjisqueeze?stkn=MTR0NGJkZTJibDJtZw==";
const STORAGE_KEY = "orenji_squeezy_products_v2";

const DEFAULT_PRODUCTS = [
  {id:crypto.randomUUID(),name:"Orenji's Local",s:6000,l:9000,st:10000,lt:14000,image:"assets/product.jpeg"},
  {id:crypto.randomUUID(),name:"Orenji's Lemon",s:11000,l:14000,st:null,lt:null,image:"assets/product.jpeg"},
  {id:crypto.randomUUID(),name:"Orenji's Wogan",s:11000,l:14000,st:18000,lt:24000,image:"assets/product.jpeg"},
  {id:crypto.randomUUID(),name:"Orenji's Sunkist",s:11000,l:14000,st:18000,lt:24000,image:"assets/product.jpeg"}
];

let products = loadProducts();
let cart = [];

function loadProducts(){
  try{
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) && saved.length ? saved : DEFAULT_PRODUCTS;
  }catch(e){ return DEFAULT_PRODUCTS; }
}
function saveProducts(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(products)); }
function rupiah(n){ return "Rp" + Number(n).toLocaleString("id-ID"); }

function renderProducts(){
  const grid = document.getElementById("productGrid");
  grid.innerHTML = products.map(p => `
    <article class="menu-card">
      <div class="pic"><img src="${p.image || "assets/product.jpeg"}" alt="${escapeHtml(p.name)}"></div>
      <div class="menu-body">
        <h3>${escapeHtml(p.name)}</h3>
        <p>Jus jeruk segar Orenji. Pilih ukuran dan opsi topping.</p>
        <div class="price-row">
          ${chip("S",p.s)}
          ${chip("L",p.l)}
          ${chip("S + topping",p.st,true)}
          ${chip("L + topping",p.lt,true)}
        </div>
        <div class="menu-actions">
          <button class="select-btn" onclick="addItem('${p.id}','S',false)">+ Ukuran S</button>
          <button class="select-btn" onclick="addItem('${p.id}','L',false)">+ Ukuran L</button>
        </div>
      </div>
    </article>`).join("");
  renderAdmin();
}
function chip(label, price, top=false){
  return `<div class="price-chip ${price==null?'disabled':''}">${label}<strong>${price==null?'—':rupiah(price)}</strong></div>`;
}
function addItem(id,size,topping){
  const p = products.find(x=>x.id===id);
  if(!p) return;
  const price = size==="S" ? (topping?p.st:p.s) : (topping?p.lt:p.l);
  if(price==null){ alert("Pilihan topping tidak tersedia untuk menu ini."); return; }
  cart.push({id,size,topping,price});
  updateCart();
  openCart();
}
function updateCart(){
  document.getElementById("cartCount").textContent = cart.length;
  const box = document.getElementById("cartItems");
  if(!cart.length){ box.innerHTML = `<p style="color:#806b5c">Keranjang masih kosong.</p>`; }
  else{
    box.innerHTML = cart.map((item,i)=>{
      const p=products.find(x=>x.id===item.id);
      return `<div class="cart-row">
        <div><b>${escapeHtml(p?.name || "Produk")}</b><br><small>${item.size}${item.topping?" + topping":""} · ${rupiah(item.price)}</small></div>
        <div class="qty"><button onclick="removeItem(${i})">−</button><b>1</b><button onclick="duplicateItem(${i})">+</button></div>
      </div>`;
    }).join("");
  }
  document.getElementById("cartTotal").textContent = rupiah(cart.reduce((a,b)=>a+b.price,0));
}
function duplicateItem(i){ cart.push({...cart[i]}); updateCart(); }
function removeItem(i){ cart.splice(i,1); updateCart(); }
function openCart(){ document.getElementById("cartModal").classList.add("open"); updateCart(); }
function closeCart(){ document.getElementById("cartModal").classList.remove("open"); }

async function sendToInstagram(){
  if(!cart.length){ alert("Tambahkan produk ke keranjang dulu."); return; }
  const lines = cart.map((x,i)=>{
    const p=products.find(y=>y.id===x.id);
    return `${i+1}. ${p?.name||"Produk"} — ${x.size}${x.topping?" + topping":""} — ${rupiah(x.price)}`;
  });
  const total = cart.reduce((a,b)=>a+b.price,0);
  const message = `Halo Orenji Squeezy 🍊\nSaya mau pesan:\n${lines.join("\n")}\nTotal: ${rupiah(total)}\n\nTerima kasih!`;
  try{ await navigator.clipboard.writeText(message); }
  catch(e){}
  window.open(INSTAGRAM_URL,"_blank","noopener");
  alert("Ringkasan pesanan sudah disalin. Buka DM Instagram Orenji lalu paste pesan tersebut.");
}

function openAdmin(){
  document.getElementById("customer").style.display="none";
  document.querySelector("footer").style.display="none";
  document.getElementById("admin").classList.add("show");
  window.scrollTo(0,0);
}
function closeAdmin(){
  document.getElementById("admin").classList.remove("show");
  document.getElementById("customer").style.display="";
  document.querySelector("footer").style.display="";
  window.scrollTo(0,0);
}
function addProduct(){
  const name=document.getElementById("pName").value.trim();
  const s=Number(document.getElementById("pS").value)||null;
  const l=Number(document.getElementById("pL").value)||null;
  const st=Number(document.getElementById("pST").value)||null;
  const lt=Number(document.getElementById("pLT").value)||null;
  const file=document.getElementById("pImage").files[0];
  if(!name || (!s && !l)){ alert("Isi nama dan minimal satu harga."); return; }

  const finish=(image)=> {
    products.push({id:crypto.randomUUID(),name,s,l,st,lt,image:image||"assets/product.jpeg"});
    saveProducts(); renderProducts();
    ["pName","pS","pL","pST","pLT"].forEach(id=>document.getElementById(id).value="");
    document.getElementById("pImage").value="";
    alert("Produk berhasil ditambahkan dan disimpan di browser ini.");
  };
  if(file){
    const reader=new FileReader();
    reader.onload=()=>finish(reader.result);
    reader.readAsDataURL(file);
  }else finish();
}
function deleteProduct(id){
  if(!confirm("Hapus produk ini?")) return;
  products=products.filter(p=>p.id!==id); saveProducts(); renderProducts();
}
function renderAdmin(){
  const box=document.getElementById("adminList");
  if(!box) return;
  box.innerHTML=products.map(p=>`
    <div class="admin-item">
      <img src="${p.image||"assets/product.jpeg"}" alt="">
      <main><b>${escapeHtml(p.name)}</b><small>S ${p.s?rupiah(p.s):"—"} · L ${p.l?rupiah(p.l):"—"}</small></main>
      <button class="danger" onclick="deleteProduct('${p.id}')">Hapus</button>
    </div>`).join("");
}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));}

renderProducts();
