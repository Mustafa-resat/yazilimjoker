'use client';

import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Bot, Calculator, Check, ChevronLeft, ChevronRight, CircleHelp, Code2, Gauge, MessageCircle, Play, Sparkles, Target, X, Zap } from 'lucide-react';

const projectTypes = ['Web Yazılım','E-Ticaret','Mobil Uygulama','Özel Yazılım','AI & Otomasyon'];
const extras = ['Admin paneli','Ödeme sistemi','WhatsApp / bildirim','Çoklu dil','API entegrasyonu','Yapay zekâ','Raporlama'];

const demoScreens = [
  { title:'Dashboard', subtitle:'Operasyon merkezi', rows:['Bugünkü siparişler','Aktif kullanıcılar','Bekleyen görevler'] },
  { title:'Siparişler', subtitle:'E-ticaret akışı', rows:['#1042 · Hazırlanıyor','#1041 · Kargoda','#1038 · Tamamlandı'] },
  { title:'Analiz', subtitle:'Raporlama ekranı', rows:['Haftalık büyüme','Dönüşüm oranı','Gelir dağılımı'] },
];

export default function ConversionSuite(){
  const [type,setType]=useState(projectTypes[0]);
  const [selected,setSelected]=useState<string[]>([]);
  const [budget,setBudget]=useState('');
  const [quizStep,setQuizStep]=useState(0);
  const [quiz,setQuiz]=useState<string[]>([]);
  const [demo,setDemo]=useState<number|null>(null);
  const [idea,setIdea]=useState('');
  const [aiAnswer,setAiAnswer]=useState('');
  const [aiMode,setAiMode]=useState<'idle'|'loading'|'ai'|'local'|'error'>('idle');
  const [hours,setHours]=useState(40);
  const [hourly,setHourly]=useState(250);
  const [saved,setSaved]=useState(40);

  useEffect(()=>{
    if(demo===null) return;
    const onKey=(event:KeyboardEvent)=>{ if(event.key==='Escape') setDemo(null); };
    const previous=document.body.style.overflow;
    document.body.style.overflow='hidden';
    window.addEventListener('keydown',onKey);
    return ()=>{ document.body.style.overflow=previous; window.removeEventListener('keydown',onKey); };
  },[demo]);

  const estimate=useMemo(()=>{
    const base:{[key:string]:number}={'Web Yazılım':30000,'E-Ticaret':50000,'Mobil Uygulama':65000,'Özel Yazılım':55000,'AI & Otomasyon':45000};
    const add=selected.length*5000;
    const min=base[type]+add;
    return `${Math.round(min/1000)}.000 – ${Math.round((min*1.8)/1000)}.000 TL`;
  },[type,selected]);
  const annual=useMemo(()=>Math.max(0,hours-saved)*hourly*12,[hours,saved,hourly]);

  function toggle(x:string){setSelected(v=>v.includes(x)?v.filter(i=>i!==x):[...v,x])}
  async function askAI(){
    if(!idea.trim()){ setAiAnswer('Fikrinizi birkaç cümleyle yazın; size uygun bir ilk proje taslağı çıkaralım.'); setAiMode('error'); return; }
    setAiMode('loading');
    try {
      const r=await fetch('/api/assistant',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({idea})});
      const data=await r.json();
      if(!r.ok || !data.answer) throw new Error();
      setAiAnswer(data.answer);
      setAiMode(data.mode==='ai'?'ai':'local');
    } catch {
      setAiMode('error');
      setAiAnswer('Asistan şu anda yanıt veremiyor. Fikrinizi yine de teklif formuna aktarabilirsiniz.');
    }
  }

  function sendBrief(text:string){
    try { sessionStorage.setItem('joker-project-brief', text); } catch {}
  }

  const quizQuestions=[
    'Müşterileriniz sistemi nerede kullanacak?',
    'En kritik ihtiyacınız hangisi?',
    'Yönetim paneli gerekiyor mu?',
  ];
  const quizOptions=[
    ['Web','Mobil','Web + Mobil'],
    ['Satış','Operasyon','Otomasyon'],
    ['Evet','Hayır','Kararsızım'],
  ];
  const quizResult=quiz.length===3 ? (quiz[1]==='Otomasyon' ? 'Otomasyon / AI çözümü' : quiz[0]==='Mobil' ? 'Mobil uygulama' : 'Özel web uygulaması') : '';

  return <>
    <section className="conversion-section section-pad">
      <div className="container">
        <div className="conversion-head"><div><span className="eyebrow">JOKER / SMART TOOLS</span><h2>Fikrinizi anlatın.<br/><span>Size uygun yolu bulalım.</span></h2></div><p>Karar vermeyi kolaylaştıran küçük araçlar hazırladık. Bunlar kesin teklif yerine ilk kapsamı anlamaya yardımcı olur.</p></div>
        <div className="smart-grid">
          <article className="smart-card estimator-card reveal">
            <div className="smart-icon"><Calculator/></div><span className="smart-kicker">01 / ÖN TAHMİN</span><h3>Proje kapsamı & bütçe</h3><p>Proje türünü ve ek ihtiyaçları seçin. Sistem yalnızca fikir vermek için yaklaşık bir aralık üretir.</p>
            <div className="choice-grid">{projectTypes.map(x=><button className={type===x?'chosen':''} onClick={()=>setType(x)} key={x}>{x}</button>)}</div>
            <div className="check-grid">{extras.map(x=><button className={selected.includes(x)?'chosen':''} onClick={()=>toggle(x)} key={x}><Check size={14}/>{x}</button>)}</div>
            <div className="estimate-output"><small>ÖN TAHMİN</small><strong>{estimate}</strong><span>Kesin fiyat değildir; kapsam görüşmesi sonrası net teklif hazırlanır.</span></div>
            <a href="#iletisim" onClick={()=>sendBrief(`Proje türü: ${type}\nEk ihtiyaçlar: ${selected.join(', ') || 'Belirtilmedi'}\nÖn tahmin: ${estimate}`)} className="smart-cta">Bu projeyi konuşalım <ArrowRight size={15}/></a>
          </article>

          <article className="smart-card ai-card reveal">
            <div className="smart-icon"><Bot/></div><span className="smart-kicker">02 / {aiMode==='ai'?'JOKER AI':'PROJE ASİSTANI'}</span><h3>Proje danışmanı</h3><p>Fikrinizi yazın; olası modülleri ve başlangıç çözümünü çıkaralım. Gerçek AI bağlantısı yapılandırılmışsa yanıt AI ile üretilir; değilse hızlı yerel asistan devreye girer.</p>
            <textarea value={idea} onChange={e=>setIdea(e.target.value)} placeholder="Örn. Bir restoran için online sipariş ve yönetim sistemi istiyorum..." rows={5}/>
            <button className="primary" onClick={askAI} disabled={aiMode==='loading'}><Sparkles size={16}/> {aiMode==='loading'?'Analiz ediliyor...':'Projeyi analiz et'} <ArrowRight size={16}/></button>
            <div className={`ai-result ${aiAnswer?'show':''}`}><small>{aiMode==='ai'?'JOKER AI ÖNERİSİ':'JOKER PROJE ASİSTANI'}</small><p>{aiAnswer || 'Burada ilk proje taslağınız görünecek.'}</p>{aiAnswer&&<a href="#iletisim" onClick={()=>sendBrief(`Proje fikrim: ${idea}\n\nAsistan taslağı: ${aiAnswer}`)}>Bu taslağı gönder <ArrowRight size={14}/></a>}</div>
          </article>
        </div>

        <div className="smart-grid lower-tools">
          <article className="smart-card quiz-card reveal">
            <div className="smart-icon"><CircleHelp/></div><span className="smart-kicker">03 / ÇÖZÜM TESTİ</span><h3>Hangi yazılıma ihtiyacınız var?</h3><p>{quizStep<3?quizQuestions[quizStep]:'İlk önerimiz hazır.'}</p>
            {quizStep<3 ? <div className="quiz-options">{quizOptions[quizStep].map(x=><button key={x} onClick={()=>{setQuiz([...quiz,x]);setQuizStep(v=>v+1)}}>{x}<ChevronRight size={15}/></button>)}</div> : <div className="quiz-result"><Check/><div><small>ÖNERİLEN BAŞLANGIÇ</small><strong>{quizResult}</strong></div><button onClick={()=>{setQuizStep(0);setQuiz([])}}>Yeniden yap</button></div>}
            <a href="#iletisim" onClick={()=>sendBrief(`Çözüm testi sonucu: ${quizResult}`)} className="smart-cta">Ücretsiz proje analizi <ArrowRight size={15}/></a>
          </article>

          <article className="smart-card roi-card reveal">
            <div className="smart-icon"><Gauge/></div><span className="smart-kicker">04 / ZAMAN HESABI</span><h3>Otomasyon potansiyeli</h3><p>Varsayımlarınızı girin; otomasyonun yıllık zaman değerini kabaca görün.</p>
            <label>Aylık mevcut saat <input type="range" min="10" max="200" value={hours} onChange={e=>setHours(+e.target.value)}/><b>{hours} saat</b></label>
            <label>Manuel saatlik değer <input type="range" min="100" max="1000" step="50" value={hourly} onChange={e=>setHourly(+e.target.value)}/><b>{hourly} TL</b></label>
            <label>Otomasyon sonrası saat <input type="range" min="0" max={hours} value={saved} onChange={e=>setSaved(+e.target.value)}/><b>{saved} saat</b></label>
            <div className="roi-output"><small>YILLIK KABA ZAMAN DEĞERİ</small><strong>{annual.toLocaleString('tr-TR')} TL</strong><span>Bu hesap örnek varsayımlara dayanır, finansal sonuç garantisi değildir.</span></div>
          </article>
        </div>

        <div className="demo-showcase reveal">
          <div><span className="eyebrow">05 / INTERACTIVE DEMOS</span><h3>Bir ekran görüntüsüne bakmak yerine<br/><span>sistemi keşfedin.</span></h3><p>Örnek arayüzler üzerinden bir yazılım ürününün nasıl hissedebileceğini deneyimleyin.</p></div>
          <div className="demo-tabs">{demoScreens.map((d,i)=><button key={d.title} onClick={()=>setDemo(i)}><span>0{i+1}</span><b>{d.title}</b><small>{d.subtitle}</small><ArrowRight size={15}/></button>)}</div>
          <button type="button" className="demo-main" onClick={()=>setDemo(0)}><div className="demo-window"><div className="demo-top"><i/><i/><i/><span>joker-demo.app</span><b>INTERACTIVE</b></div><div className="demo-content"><div className="demo-side"><i/><i/><i/><i/></div><div className="demo-board"><div className="demo-heading"><span>Overview</span><b>+12.8%</b></div><div className="demo-cards"><i/><i/><i/></div><div className="demo-chart"><b/><b/><b/><b/><b/><b/><b/><b/></div></div></div><span className="demo-play"><Play fill="currentColor"/></span></div><span>Demo'yu aç</span></button>
        </div>

        <div className="trust-hub reveal"><div><span className="smart-kicker">06 / TRUST CENTER</span><h3>Abartı değil, <span>kanıtlanabilir yaklaşım.</span></h3></div><div className="trust-items"><span><Zap/> Modern teknoloji</span><span><Code2/> Kaynak kod odaklı geliştirme</span><span><Target/> İhtiyaca göre kapsam</span><span><MessageCircle/> Şeffaf iletişim</span></div></div>
      </div>
    </section>
    {demo!==null && <div className="demo-modal" role="dialog" aria-modal="true" aria-label="İnteraktif örnek demo"><button className="demo-close" onClick={()=>setDemo(null)} aria-label="Kapat"><X/></button><div className="demo-modal-inner"><div className="demo-modal-head"><div><span className="eyebrow">JOKER DEMO / 0{demo+1}</span><h3>{demoScreens[demo].title}</h3><p>{demoScreens[demo].subtitle}</p></div><div className="demo-nav"><button disabled={demo===0} onClick={()=>setDemo(v=>v===null?0:v-1)}><ChevronLeft/></button><button disabled={demo===demoScreens.length-1} onClick={()=>setDemo(v=>v===null?0:v+1)}><ChevronRight/></button></div></div><div className="demo-large"><div className="demo-large-side"><b>JOKER</b><span>Overview</span><span>Projects</span><span>Users</span><span>Reports</span></div><div className="demo-large-main"><div className="demo-stat-row">{demoScreens[demo].rows.map((x,i)=><div key={x}><small>{x}</small><strong>{i===0?'1,248':i===1?'86%':'24'}</strong></div>)}</div><div className="demo-graph"><span>Performance</span>{Array.from({length:12},(_,i)=><i key={i} style={{height:`${30+(i*17)%60}%`}}/>)}</div><div className="demo-table">{demoScreens[demo].rows.map((x,i)=><div key={x}><span>{x}</span><b>{i===0?'Aktif':'Hazır'}</b></div>)}</div></div></div><a href="#iletisim" onClick={()=>{setDemo(null);sendBrief(`İlgilendiğim örnek demo: ${demoScreens[demo].title} — ${demoScreens[demo].subtitle}`)}} className="primary"><MessageCircle size={16}/> Bu yapıyı projem için iste <ArrowRight size={16}/></a></div></div>}
  </>;
}
