
const themeBtn = document.getElementById('themeToggle');
if (localStorage.getItem('theme') === 'dark') document.body.classList.add('dark');
themeBtn.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const dark = document.body.classList.contains('dark');
  themeBtn.textContent = dark ? '☀️' : '🌙';
  localStorage.setItem('theme', dark ? 'dark' : 'light');
});


const audio = document.getElementById('bgAudio');
const soundBtn = document.getElementById('soundToggle');
audio.volume = 0.4;
let playing = false;
const savedTime = parseFloat(localStorage.getItem('audioTime') || '0');
audio.currentTime = isNaN(savedTime) ? 0 : savedTime;
if (localStorage.getItem('audioPlaying') === '1') {
  audio.play().then(() => { playing = true; soundBtn.textContent = '🔇'; }).catch(()=>{});
}
soundBtn.addEventListener('click', () => {
  if (playing) { audio.pause(); soundBtn.textContent = '🔊'; localStorage.setItem('audioPlaying','0'); }
  else { audio.play().then(()=>{ soundBtn.textContent = '🔇'; localStorage.setItem('audioPlaying','1'); }).catch(()=>alert('Tambahkan file assets/backsound.mp3')); }
  playing = !playing;
});
setInterval(()=>{ if(!audio.paused) localStorage.setItem('audioTime', audio.currentTime); }, 1000);

// Reveal on scroll
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible'); });
},{threshold:.15});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// Tabs (galeri)
document.querySelectorAll('.tab-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c=>c.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});

// Modal Surat
function openSurat(){ document.getElementById('suratModal').classList.add('show'); }
function closeSurat(){ document.getElementById('suratModal').classList.remove('show'); }
window.openSurat = openSurat; window.closeSurat = closeSurat;
window.addEventListener('click', e=>{ if(e.target.id==='suratModal') closeSurat(); });
