const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const lowPowerDevice = navigator.deviceMemory && navigator.deviceMemory <= 2;
if (reducedMotion || lowPowerDevice) document.body.classList.add('low-power');
const whatsappNumber = '2348036841108';
const products = [
  {id:'bar-set',name:'Called to the Bar Set',category:'Legal essentials',price:48500,occasion:['court','event'],style:'card-legal',art:'<span class="law-book"></span><span class="law-pen"></span>',fabric:'Cotton bib, lined accessory bag',sizes:'One size'},
  {id:'authority-suit',name:'The Authority Suit',category:'Corporate dressing',price:92000,occasion:['office','event'],style:'card-corporate',art:'<span class="blazer"></span>',fabric:'Premium crepe suiting',sizes:'UK 8 - 18'},
  {id:'noor-abaya',name:'Noor Signature Abaya',category:'Signature abayas',price:68500,occasion:['ramadan','event'],style:'card-abaya',art:'<span class="mini-abaya"></span>',fabric:'Nida crepe with satin trim',sizes:'52 - 60 inches'}
];
const naira = new Intl.NumberFormat('en-NG',{style:'currency',currency:'NGN',maximumFractionDigits:0});
const readCart = () => JSON.parse(localStorage.getItem('zyamsk-cart') || '[]');
const writeCart = (cart) => { localStorage.setItem('zyamsk-cart', JSON.stringify(cart)); updateCartCount(); };
const updateCartCount = () => document.querySelectorAll('[data-cart-count]').forEach((el) => { el.textContent = readCart().reduce((sum,item) => sum + item.quantity,0); });
const getProduct = (id) => products.find((product) => product.id === id);

const grid = document.querySelector('#product-grid');
if(grid){
  const showProducts = (filter='all') => { grid.innerHTML = products.filter((product) => filter === 'all' || product.occasion.includes(filter)).map((product,index) => `<a class="collection-card ${product.style} reveal" href="product.html?id=${product.id}"><div class="card-number">0${index+1}</div><div class="card-art">${product.art}</div><div class="card-content"><p>${product.category}</p><h3>${product.name.replace(' ', '<br>')}</h3><div class="card-price">${naira.format(product.price)}</div><span>View piece <b>+</b></span></div></a>`).join(''); };
  showProducts();
  document.querySelectorAll('[data-filter]').forEach((button) => button.addEventListener('click', () => { document.querySelector('[data-filter].active')?.classList.remove('active'); button.classList.add('active'); showProducts(button.dataset.filter); }));
}

const productRoot = document.querySelector('[data-product-detail]');
if(productRoot){
  const product = getProduct(new URLSearchParams(location.search).get('id')) || products[0];
  document.title = `${product.name} | ZYAMSK`;
  productRoot.innerHTML = `<div class="product-visual ${product.style}"><div class="card-art">${product.art}</div></div><div class="product-info"><p class="eyebrow"><span></span>${product.category}</p><h1>${product.name}</h1><div class="price">${naira.format(product.price)}</div><p>A considered Zyamsk piece designed for confidence, comfort and a composed finish. Each order is carefully prepared in Lagos.</p><div class="details-list"><div><strong>Fabric</strong><span>${product.fabric}</span></div><div><strong>Sizes</strong><span>${product.sizes}</span></div><div><strong>Dispatch</strong><span>3 - 5 working days</span></div></div><div class="purchase-row"><select aria-label="Select size"><option>Select size</option><option>UK 8 / 52 inches</option><option>UK 10 / 54 inches</option><option>UK 12 / 56 inches</option><option>UK 14 / 58 inches</option><option>UK 16 / 60 inches</option></select><button class="button button-dark" data-add-cart="${product.id}">Add to bag +</button></div><a class="whatsapp-order" target="_blank" rel="noopener" href="https://wa.me/2340000000000?text=Hello%20ZYAMSK%2C%20I%20am%20interested%20in%20the%20${encodeURIComponent(product.name)}.">Order or ask on WhatsApp +</a><p class="contact-note">Need a custom size? <a href="guide.html#bespoke">Make a bespoke request.</a></p></div>`;
}

document.addEventListener('click',(event) => { const button = event.target.closest('[data-add-cart]'); if(!button) return; const cart=readCart(); const existing=cart.find((item) => item.id===button.dataset.addCart); if(existing) existing.quantity += 1; else cart.push({id:button.dataset.addCart,quantity:1}); writeCart(cart); button.textContent='Added to bag'; setTimeout(() => button.textContent='Add to bag +',1400); });

const cartRoot = document.querySelector('[data-cart]');
if(cartRoot){ const renderCart = () => { const cart=readCart(); if(!cart.length){cartRoot.innerHTML='<div class="empty-cart"><p>Your bag is currently empty.</p><a class="button button-gold" href="index.html#collections">Explore the collection +</a></div>';return;} const items=cart.map((line) => ({...getProduct(line.id),quantity:line.quantity})); const total=items.reduce((sum,item)=>sum+item.price*item.quantity,0); cartRoot.innerHTML=`${items.map((item) => `<article class="cart-item"><div><p class="eyebrow"><span></span>${item.category}</p><h3>${item.name}</h3><button data-remove="${item.id}">Remove</button></div><p>Qty ${item.quantity}</p><strong>${naira.format(item.price*item.quantity)}</strong></article>`).join('')}<div class="cart-total"><span>Subtotal</span><strong>${naira.format(total)}</strong></div><p class="checkout-note">Online card, bank transfer and USSD checkout will be activated when your Paystack or Flutterwave account keys are connected. For now, send your order by WhatsApp and we will confirm payment and delivery.</p><a class="button button-gold" target="_blank" rel="noopener" href="https://wa.me/2340000000000?text=Hello%20ZYAMSK%2C%20I%20would%20like%20to%20complete%20my%20order.">Complete on WhatsApp +</a>`; }; cartRoot.addEventListener('click',(event)=>{const remove=event.target.closest('[data-remove]');if(!remove)return;writeCart(readCart().filter((item)=>item.id!==remove.dataset.remove));renderCart();});renderCart(); }

const menuButton = document.querySelector('.menu-button'); const navigation = document.querySelector('.navigation');
menuButton?.addEventListener('click',()=>{const open=navigation.classList.toggle('open');menuButton.setAttribute('aria-expanded',open);});
document.querySelectorAll('.navigation a').forEach((link)=>link.addEventListener('click',()=>navigation.classList.remove('open')));
document.querySelector('[data-newsletter-form]')?.addEventListener('submit',(event)=>{event.preventDefault();event.currentTarget.innerHTML='<p style="margin:15px 0;color:#c9a464;font:11px DM Mono,monospace;letter-spacing:.1em;text-transform:uppercase">Thank you. Newsletter delivery will go live once the email provider is connected.</p>';});
document.querySelector('[data-bespoke-form]')?.addEventListener('submit',(event)=>{event.preventDefault();event.currentTarget.innerHTML='<p class="checkout-note">Thank you. Please send your request to WhatsApp so the Zyamsk team can confirm your measurements and quote.</p>';});
updateCartCount();
document.querySelectorAll('a[href*="2340000000000"]').forEach((link) => { link.href = link.href.replace('2340000000000', whatsappNumber); });
document.querySelectorAll('a[href*="tiktok.com"]').forEach((link) => link.remove());
document.querySelectorAll('a[href="https://instagram.com"]').forEach((link) => { link.href = 'https://www.instagram.com/zyamsk_collections/'; });
document.querySelectorAll('.navigation a[href="#contact"]').forEach((link) => { link.href = 'contact.html'; });
