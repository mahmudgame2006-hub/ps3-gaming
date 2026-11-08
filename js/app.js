/* =========================================
   PS3 GAMING - Logika web (tab, pencarian, pop-up, animasi, intro, partikel)
   ========================================= */
/* ========= WARNA SAMPUL PER KATEGORI ========= */
const warnaKat = {
  "Bola":["#0f6b3a","#04140c"], "Aksi":["#1e3a8a","#060b1a"], "Tembak":["#334155","#05080f"],
  "Horor":["#7f1d1d","#0b0405"], "Balap":["#b45309","#140903"], "Olahraga":["#0e7490","#03121a"],
  "Fighting":["#9d174d","#12040b"], "Anime":["#6d28d9","#0d0618"], "Keluarga":["#0891b2","#03141a"]
};
const esc = s => s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function huruf(n){ return n.replace(/[^A-Za-z0-9 ]/g,"").split(" ").filter(Boolean).slice(0,2).map(w=>w[0]).join("").toUpperCase(); }
/* ========= PEMUAT GAMBAR =========
   Nama di "img" boleh tanpa ekstensi. Kode otomatis mencoba .png, .jpg, .jpeg, .webp
   di folder Assets. Kalau tidak ketemu, tampil sampul warna. */
const FOLDER = "Assets/";
const EKST = [".png",".jpg",".jpeg",".webp",".PNG",".JPG",".JPEG"];
const cacheGbr = {};
function daftarCoba(nama){
  const ada = /\.(png|jpe?g|webp)$/i.test(nama);
  const dasar = ada ? nama.replace(/\.[^.]+$/,"") : nama;
  const list = EKST.map(e=>dasar+e);
  return ada ? [nama, ...list.filter(x=>x!==nama)] : list;
}
const urlGbr = f => FOLDER + encodeURI(f).replace(/#/g,"%23");
function tagGbr(nama, alt, attr="", fallback=""){
  const list = cacheGbr[nama] ? [cacheGbr[nama]] : daftarCoba(nama);
  return `<img src="${urlGbr(list[0])}" data-nama="${esc(nama)}" data-coba="${esc(JSON.stringify(list.slice(1)))}" data-f="${esc(fallback)}" alt="${esc(alt)}" decoding="async" ${attr} onerror="cobaGbr(this)" onload="gbrJadi(this)">`;
}
function cobaGbr(el){
  const l = JSON.parse(el.dataset.coba||"[]");
  if(l.length){ el.dataset.coba = JSON.stringify(l.slice(1)); el.src = urlGbr(l[0]); return; }
  if(el.dataset.f) el.replaceWith(document.createRange().createContextualFragment(el.dataset.f));
  else el.style.visibility = "hidden";
}
function gbrJadi(el){
  const f = decodeURI(el.getAttribute("src").slice(FOLDER.length));
  cacheGbr[el.dataset.nama] = f;
  const b = el.previousElementSibling;
  if(b && b.classList.contains("latar-blur")) b.style.backgroundImage = `url("${el.src}")`;
}
function cariGbr(nama){ /* untuk background CSS */
  return new Promise(ok=>{
    const list = daftarCoba(nama); let i=0;
    const im = new Image();
    im.onload = ()=>{ cacheGbr[nama]=list[i]; ok(urlGbr(list[i])); };
    im.onerror = ()=>{ i++; if(i<list.length) im.src=urlGbr(list[i]); else ok(null); };
    im.src = urlGbr(list[0]);
  });
}

function sampul(g){
  const [a,b] = warnaKat[g.k] || ["#1e3a8a","#05080f"];
  const teks = `<div class="sampul-teks" data-huruf="${huruf(g.n)}" style="--grad:linear-gradient(150deg,${a},${b} 75%)"><b>${esc(g.n)}</b></div>`;
  if(!g.img) return teks;
  return `<div class="latar-blur"></div>` + tagGbr(g.img, g.n, `class="cover" loading="lazy"${g.pos?` style="object-position:${g.pos}"`:""}`, teks);
}

/* ========= TAB ========= */
const urutan = ["beranda","bola","update","game","harga","lokasi"];
let aktif = null;
function buka(id, dorong=true){
  if(!urutan.includes(id)) id = "beranda";
  if(id === aktif) return;
  const lama = urutan.indexOf(aktif), baru = urutan.indexOf(id);
  document.querySelectorAll(".panel").forEach(p=>{
    const i = urutan.indexOf(p.id.slice(2));
    p.classList.toggle("aktif", i===baru);
    p.classList.toggle("kiri", i<baru);
  });
  document.querySelectorAll(".tab").forEach(t=>t.classList.toggle("aktif", t.dataset.ke===id));
  aktif = id;
  document.body.dataset.tema = id;
  document.querySelectorAll(".tema").forEach(t=>t.classList.toggle("on", t.classList.contains("t-"+id)));
  geserIndikator();
  if(dorong) history.replaceState(null,"","#"+id);
  if(id==="game") requestAnimationFrame(()=>{ hitungPerHal(); render(); });
  if(id==="update") animasiBusur();
}
function geserIndikator(){
  const t = document.querySelector(".tab.aktif"), ind = document.getElementById("indikator");
  if(!t) return;
  ind.style.left = t.offsetLeft + 10 + "px";
  ind.style.width = t.offsetWidth - 20 + "px";
  t.scrollIntoView({block:"nearest",inline:"center",behavior:"smooth"});
}
document.addEventListener("click", e=>{
  const el = e.target.closest("[data-ke]");
  if(el){ e.preventDefault(); tutupModal(); buka(el.dataset.ke); }
});
window.addEventListener("keydown", e=>{
  if(e.key==="Escape") return tutupModal();
  if(document.activeElement.tagName==="INPUT" || document.getElementById("overlay").classList.contains("buka")) return;
  const i = urutan.indexOf(aktif);
  if(aktif==="game" && (e.key==="ArrowRight"||e.key==="ArrowLeft")){ gantiHal(e.key==="ArrowRight"?1:-1); return; }
  if(e.key==="ArrowRight" && i<urutan.length-1) buka(urutan[i+1]);
  if(e.key==="ArrowLeft" && i>0) buka(urutan[i-1]);
});
/* geser (swipe) di HP */
let sx=null, sy=null;
document.getElementById("panggung").addEventListener("touchstart",e=>{sx=e.touches[0].clientX;sy=e.touches[0].clientY},{passive:true});
document.getElementById("panggung").addEventListener("touchend",e=>{
  if(sx===null) return;
  const dx=e.changedTouches[0].clientX-sx, dy=e.changedTouches[0].clientY-sy; sx=null;
  if(Math.abs(dx)<60 || Math.abs(dy)>Math.abs(dx)) return;
  if(e.target.closest(".peta,.filter")) return;
  const arah = dx<0?1:-1;
  if(aktif==="game"){ const ok=gantiHal(arah); if(ok) return; }
  const i=urutan.indexOf(aktif)+arah;
  if(i>=0 && i<urutan.length) buka(urutan[i]);
});

/* ========= DAFTAR GAME + HALAMAN ========= */
const kategori = ["Semua", ...new Set(games.map(g=>g.k))];
let kat = "Semua", kata = "", hal = 0, perHal = 12;
document.getElementById("filter").innerHTML = kategori.map(k=>`<button class="${k==='Semua'?'aktif':''}" data-kat="${k}">${k}</button>`).join("");
document.getElementById("filter").addEventListener("click",e=>{
  const b=e.target.closest("button"); if(!b) return;
  kat=b.dataset.kat; hal=0;
  document.querySelectorAll("#filter button").forEach(x=>x.classList.toggle("aktif",x===b));
  render();
});
document.getElementById("cari").addEventListener("input",e=>{kata=e.target.value.toLowerCase().trim();hal=0;render();});
document.getElementById("sebelum").onclick=()=>gantiHal(-1);
document.getElementById("sesudah").onclick=()=>gantiHal(1);

function hasil(){ return games.filter(g=>(kat==="Semua"||g.k===kat) && g.n.toLowerCase().includes(kata)); }
function hitungPerHal(){
  const grid=document.getElementById("grid"), wrap=grid.parentElement;
  const h=wrap.clientHeight, w=wrap.clientWidth; if(!h||!w) return;
  const kecil = innerWidth<=860, gap = kecil?10:14, minW = kecil?140:180;
  const kol = Math.max(1, Math.floor((w+gap)/(minW+gap)));
  let tinggi = kecil?150:190;
  let baris = Math.max(1, Math.floor((h+gap)/(tinggi+gap)));
  tinggi = Math.floor((h - gap*(baris-1))/baris);           // isi penuh tinggi area
  if(tinggi>240){ baris++; tinggi=Math.floor((h-gap*(baris-1))/baris); }
  grid.style.setProperty("--tinggi-kartu", tinggi+"px");
  perHal = kol*baris;
}
function render(){
  const data=hasil(), total=Math.max(1,Math.ceil(data.length/perHal));
  hal=Math.min(hal,total-1);
  const potong=data.slice(hal*perHal,(hal+1)*perHal);
  const grid=document.getElementById("grid");
  grid.innerHTML = potong.length ? potong.map((g,i)=>`
    <button class="game" data-n="${esc(g.n)}" style="animation-delay:${i*25}ms">
      <div class="sampul">${sampul(g)}</div>
      <div class="game-isi"><span>${g.k}</span><h4>${esc(g.n)}</h4></div>
    </button>`).join("") : `<p class="kosong">Game tidak ditemukan. Tanya langsung di lokasi, siapa tahu ada.</p>`;
  document.getElementById("titik").innerHTML = total>1 && total<=12 ? Array.from({length:total},(_,i)=>`<button class="${i===hal?'aktif':''}" data-h="${i}" aria-label="Halaman ${i+1}"></button>`).join("") : "";
  document.getElementById("infoHal").textContent = `${data.length} game · Hal ${hal+1}/${total}`;
  document.getElementById("sebelum").disabled = hal===0;
  document.getElementById("sesudah").disabled = hal>=total-1;
}
function gantiHal(arah){
  const total=Math.max(1,Math.ceil(hasil().length/perHal)), baru=hal+arah;
  if(baru<0||baru>=total) return false;
  hal=baru; render(); return true;
}
document.getElementById("titik").addEventListener("click",e=>{const b=e.target.closest("button");if(b){hal=+b.dataset.h;render();}});
document.getElementById("grid").addEventListener("click",e=>{const b=e.target.closest(".game");if(b) bukaModal(b.dataset.n);});

/* ========= MODAL ========= */
const NOMOR_WA = "6282261865971";
function setWa(pesan){ document.getElementById("mWa").href = `https://wa.me/${NOMOR_WA}?text=${encodeURIComponent(pesan)}`; }
function bukaModal(n){
  const g=games.find(x=>x.n===n); if(!g) return;
  document.getElementById("mGbr").innerHTML = sampul(g) + `<button class="tutup" onclick="tutupModal()" aria-label="Tutup"><svg><use href="#i-x"/></svg></button>`;
  document.getElementById("mKat").textContent = g.k + (g.k==="Bola"?" · Selalu Update":"");
  document.getElementById("mNama").textContent = g.n;
  document.getElementById("mDesk").textContent = g.d;
  document.getElementById("mHarga").innerHTML = `Rp50K<small>${g.k==="Bola"?"Pasang / update bola":"Biaya pasang game"}</small>`;
  setWa(`Halo PS3 Gaming, saya mau ${g.k==="Bola"?"pasang/update":"pasang game"} ${g.n}. Bisa?`);
  document.getElementById("overlay").classList.add("buka");
}
const layanan = {
  multiman:{n:"Pasang multiMAN / MMCM", k:"Layanan", img:"multiman", h:"Rp100K", hs:"Pasang multiMAN / MMCM",
    d:"multiMAN dan MMCM adalah aplikasi pengelola game di PS3: menampilkan daftar game dengan rapi, menjalankan game dari hardisk, dan mengatur file. Dipasang langsung di lokasi kami."},
  hen:{n:"Pasang HEN", k:"Layanan", img:"hen", h:"Rp100K", hs:"Pemasangan HEN",
    d:"Pemasangan HEN di PS3 agar bisa menjalankan game yang dipasang dan aplikasi pendukung seperti multiMAN. Bawa PS3 kamu, kami kerjakan langsung di tempat."}
};
function bukaLayanan(id){
  const g=layanan[id]; if(!g) return;
  document.getElementById("mGbr").innerHTML = tagGbr(g.img, g.n, `style="object-fit:contain;background:radial-gradient(circle,#0b2a66,#05080f)"`) + `<button class="tutup" onclick="tutupModal()" aria-label="Tutup"><svg><use href="#i-x"/></svg></button>`;
  document.getElementById("mKat").textContent = g.k;
  document.getElementById("mNama").textContent = g.n;
  document.getElementById("mDesk").textContent = g.d;
  document.getElementById("mHarga").innerHTML = `${g.h}<small>${g.hs}</small>`;
  setWa(`Halo PS3 Gaming, saya mau ${g.n}. Bisa?`);
  document.getElementById("overlay").classList.add("buka");
}
document.addEventListener("click",e=>{ const b=e.target.closest("[data-layanan]"); if(b) bukaLayanan(b.dataset.layanan); });
document.querySelectorAll(".harga").forEach(el=>el.addEventListener("pointermove",e=>{
  const r=el.getBoundingClientRect(); el.style.setProperty("--mx",(e.clientX-r.left)+"px"); el.style.setProperty("--my",(e.clientY-r.top)+"px");
}));
function tutupModal(){ document.getElementById("overlay").classList.remove("buka"); }
document.getElementById("overlay").addEventListener("click",e=>{ if(e.target.id==="overlay") tutupModal(); });
document.getElementById("mLokasi").onclick=()=>{ tutupModal(); buka("lokasi"); };

/* ========= LAIN-LAIN ========= */
function animasiBusur(){
  const c=document.getElementById("busur");
  c.style.transition="none"; c.style.strokeDashoffset="301.6";
  requestAnimationFrame(()=>requestAnimationFrame(()=>{ c.style.transition="stroke-dashoffset 1.4s cubic-bezier(.6,0,.2,1)"; c.style.strokeDashoffset="0"; }));
}
let tunda;
window.addEventListener("resize",()=>{ clearTimeout(tunda); tunda=setTimeout(()=>{ geserIndikator(); if(aktif==="game"){hitungPerHal();render();} },120); });
window.addEventListener("hashchange",()=>buka(location.hash.slice(1),false));
document.getElementById("jmlGame").textContent = games.length + "+";
document.querySelectorAll("[data-gbr]").forEach(el=>{ el.insertAdjacentHTML("beforeend", tagGbr(el.dataset.gbr, el.dataset.gbr)); });
/* gambar Gembox untuk Beranda & Game Bola: pakai alamat lengkap supaya tidak salah folder */
cariGbr("Gembox 2027").then(u=>{
  if(!u) return;
  const lengkap = new URL(u, document.baseURI).href;
  document.querySelectorAll(".km1, .bola-gambar").forEach(el=>{ el.style.backgroundImage = `url("${lengkap}")`; });
});
(function(){ /* pita game berjalan di beranda */
  const ada = games.filter(g=>g.img);
  const isi = ada.map(g=>`<button data-n="${esc(g.n)}" title="${esc(g.n)}">${tagGbr(g.img, g.n, 'loading="lazy"')}</button>`).join("");
  const pita = document.getElementById("pitaGame");
  pita.innerHTML = isi + isi;
  pita.addEventListener("click",e=>{ const b=e.target.closest("button"); if(b) bukaModal(b.dataset.n); });
})();
document.fonts && document.fonts.ready.then(geserIndikator);
buka(location.hash.slice(1) || "beranda", false);

/* ========= PARTIKEL LATAR (versi ringan) ========= */
(function(){
  const cv=document.getElementById("partikel"), cx=cv.getContext("2d",{alpha:true});
  if(matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  let W,H,titik=[], mouse={x:-999,y:-999}, jalan=true, akhir=0;
  const hp = innerWidth<860;
  function ukur(){
    W=innerWidth; H=innerHeight; cv.width=W; cv.height=H;   /* resolusi 1x: jauh lebih ringan */
    const n=Math.round(Math.min(hp?22:45, W*H/26000));
    titik=Array.from({length:n},()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.3,vy:(Math.random()-.5)*.3,r:Math.random()*1.5+.8,dua:Math.random()<.3}));
  }
  addEventListener("resize",()=>{clearTimeout(ukur.t);ukur.t=setTimeout(ukur,200);}); ukur();
  if(!hp) addEventListener("pointermove",e=>{mouse.x=e.clientX;mouse.y=e.clientY;},{passive:true});
  document.addEventListener("visibilitychange",()=>{ jalan=!document.hidden; document.body.classList.toggle("diam",document.hidden); if(jalan) requestAnimationFrame(loop); });
  const jarak=120, jarak2=jarak*jarak;
  const warnaTema={beranda:["63,182,255","25,230,255"],bola:["134,239,172","255,251,224"],update:["25,230,255","94,234,212"],game:["232,121,249","129,140,248"],harga:["250,204,21","253,230,138"],lokasi:["45,212,191","255,77,109"]};
  function loop(t){
    if(!jalan) return;
    requestAnimationFrame(loop);
    if(t-akhir<32) return;            /* batasi ~30 fps */
    akhir=t;
    cx.clearRect(0,0,W,H);
    const wt=warnaTema[document.body.dataset.tema]||warnaTema.beranda;
    for(const p of titik){
      p.x+=p.vx*2; p.y+=p.vy*2;
      if(p.x<0||p.x>W) p.vx*=-1; if(p.y<0||p.y>H) p.vy*=-1;
      const dx=p.x-mouse.x, dy=p.y-mouse.y, d2=dx*dx+dy*dy;
      if(d2<14400){ const d=Math.sqrt(d2)||1; p.x+=dx/d*2; p.y+=dy/d*2; }
    }
    cx.lineWidth=1;
    for(let i=0;i<titik.length;i++){
      const a=titik[i];
      for(let j=i+1;j<titik.length;j++){
        const b=titik[j], dx=a.x-b.x, dy=a.y-b.y, d2=dx*dx+dy*dy;
        if(d2<jarak2){ cx.strokeStyle=`rgba(${wt[0]},${(1-Math.sqrt(d2)/jarak)*.3})`; cx.beginPath(); cx.moveTo(a.x,a.y); cx.lineTo(b.x,b.y); cx.stroke(); }
      }
    }
    for(const a of titik){
      const c=a.dua?wt[1]:wt[0];
      cx.fillStyle=`rgba(${c},.25)`; cx.beginPath(); cx.arc(a.x,a.y,a.r*3,0,6.283); cx.fill();   /* glow murah */
      cx.fillStyle=`rgb(${c})`; cx.beginPath(); cx.arc(a.x,a.y,a.r,0,6.283); cx.fill();
    }
  }
  requestAnimationFrame(loop);
})();

/* ========= INTRO ========= */
(function(){
  const intro=document.getElementById("intro"), bar=document.getElementById("introBar"), persen=document.getElementById("introPersen");
  let p=0, sudah=false;
  const target=Date.now()+2600;
  /* muat beberapa gambar dulu selama intro */
  const daftar=games.filter(g=>g.img).slice(0,14).map(g=>g.img);
  let siap=0; daftar.forEach(n=>cariGbr(n).then(()=>siap++));
  const tik=setInterval(()=>{
    const waktu=Math.min(1,1-(target-Date.now())/2600);
    const muat=daftar.length?siap/daftar.length:1;
    p=Math.max(p,Math.round(Math.min(waktu,muat*.5+waktu*.5)*100));
    bar.style.width=p+"%"; persen.textContent=p+"%";
    if(waktu>=1) masuk();
  },60);
  function masuk(){
    if(sudah) return; sudah=true; clearInterval(tik);
    bar.style.width="100%"; persen.textContent="100%";
    intro.classList.add("keluar");
    setTimeout(()=>{
      intro.classList.add("selesai");
      document.body.classList.remove("intro-aktif");
      document.body.classList.add("web-masuk");
      ledakan(innerWidth/2, innerHeight/2, 50);
    },550);
    setTimeout(()=>intro.remove(),1500);
  }
  intro.addEventListener("click",()=>{ if(Date.now()>target-2200) masuk(); });
  addEventListener("keydown",e=>{ if(!sudah && (e.key==="Enter"||e.key===" ")) masuk(); });
})();

/* ========= PARTIKEL SAAT KLIK ========= */
const cvK=document.getElementById("percikan"), ctxK=cvK.getContext("2d");
let butir=[], gelombang=[], jalanK=false;
function ukurK(){ const d=1; cvK.width=innerWidth*d; cvK.height=innerHeight*d; ctxK.setTransform(d,0,0,d,0,0); }
addEventListener("resize",ukurK); ukurK();
const WARNA_K=["#19e6ff","#00b4ff","#7fe9ff","#ffffff","#3d7bff","#ffc83d"];
function ledakan(x,y,n=18){
  if(matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  for(let i=0;i<n;i++){
    const a=Math.random()*Math.PI*2, v=Math.random()*5+1.5;
    butir.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-1,r:Math.random()*2.6+1,life:1,dec:Math.random()*.02+.015,
      c:WARNA_K[Math.random()<.12?5:Math.floor(Math.random()*5)], bintang:Math.random()<.25});
  }
  gelombang.push({x,y,r:4,life:1});
  if(!jalanK){ jalanK=true; requestAnimationFrame(gambarK); }
}
function bintangK(x,y,r){ ctxK.beginPath(); for(let i=0;i<4;i++){ const a=i*Math.PI/2; ctxK.lineTo(x+Math.cos(a)*r*2.6,y+Math.sin(a)*r*2.6); ctxK.lineTo(x+Math.cos(a+Math.PI/4)*r*.7,y+Math.sin(a+Math.PI/4)*r*.7);} ctxK.closePath(); ctxK.fill(); }
function gambarK(){
  ctxK.clearRect(0,0,innerWidth,innerHeight);
  ctxK.globalCompositeOperation="lighter";
  for(const g of gelombang){ g.r+=5; g.life-=.045;
    ctxK.strokeStyle=`rgba(25,230,255,${Math.max(g.life,0)*.8})`; ctxK.lineWidth=2.5*g.life+.5;
    ctxK.beginPath(); ctxK.arc(g.x,g.y,g.r,0,Math.PI*2); ctxK.stroke(); }
  for(const b of butir){ b.x+=b.vx; b.y+=b.vy; b.vx*=.96; b.vy=b.vy*.96+.08; b.life-=b.dec;
    ctxK.globalAlpha=Math.max(b.life,0); ctxK.fillStyle=b.c;
    if(b.bintang) bintangK(b.x,b.y,b.r); else { ctxK.beginPath(); ctxK.arc(b.x,b.y,b.r*b.life+.4,0,6.283); ctxK.fill(); ctxK.globalAlpha*=.25; ctxK.beginPath(); ctxK.arc(b.x,b.y,b.r*3,0,6.283); ctxK.fill(); } }
  ctxK.globalAlpha=1; ctxK.globalCompositeOperation="source-over";
  butir=butir.filter(b=>b.life>0); gelombang=gelombang.filter(g=>g.life>0);
  if(butir.length||gelombang.length) requestAnimationFrame(gambarK); else { jalanK=false; ctxK.clearRect(0,0,innerWidth,innerHeight); }
}
addEventListener("pointerdown",e=>{ if(document.getElementById("intro")?.classList.contains("selesai")===false) return; ledakan(e.clientX,e.clientY); });
