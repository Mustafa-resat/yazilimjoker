import { NextResponse } from 'next/server';
import { supabaseConfigured, supabaseRequest } from '../../lib-supabase';

const buckets = new Map<string, { count: number; reset: number }>();
let lastCleanup = Date.now();
function allowed(ip: string) {
  const now = Date.now();
  if (now - lastCleanup > 10 * 60_000) { for (const [key, value] of buckets) if (value.reset < now) buckets.delete(key); lastCleanup = now; } const current = buckets.get(ip);
  if (!current || current.reset < now) { buckets.set(ip, { count: 1, reset: now + 60_000 }); return true; }
  if (current.count >= 5) return false; current.count += 1; return true;
}

export async function POST(req: Request){
 try{
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if(!allowed(ip)) return NextResponse.json({ok:false,error:'Çok fazla istek gönderildi. Lütfen biraz sonra tekrar deneyin.'},{status:429});
  const body=await req.json();
  const {name,email,phone,type,message,website}=body ?? {};
  if(website) return NextResponse.json({ok:true});
  if(typeof name!=='string'||typeof email!=='string'||typeof message!=='string'||!name.trim()||!email.trim()||!message.trim()) return NextResponse.json({ok:false,error:'Zorunlu alanları doldurun.'},{status:400});
  if(name.length>120||email.length>180||phone?.length>40||type?.length>80||message.length>4000) return NextResponse.json({ok:false,error:'Form alanlarından biri çok uzun.'},{status:400});
  const apiKey=process.env.RESEND_API_KEY;
  if(!apiKey) return NextResponse.json({ok:false,error:'E-posta servisi yapılandırılmamış. Lütfen doğrudan WhatsApp veya e-posta ile ulaşın.'},{status:503});
  const clean={name:name.trim(),email:email.trim(),phone:typeof phone==='string'?phone.trim():'',type:typeof type==='string'?type.trim():'',message:message.trim()};
  if (supabaseConfigured()) {
    const saved=await supabaseRequest('quotes',{method:'POST',headers:{Prefer:'return=minimal'},body:JSON.stringify(clean)});
    if(!saved.ok) return NextResponse.json({ok:false,error:'Teklif kaydı oluşturulamadı.'},{status:502});
  }
  const text=[`Yeni JOKER YAZILIM teklif talebi`,`Ad/Firma: ${clean.name}`,`E-posta: ${clean.email}`,`Telefon: ${clean.phone || '-'}`,`Proje türü: ${clean.type || '-'}`,`Mesaj: ${clean.message}`].join('\n');
  const r=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${apiKey}`,'Content-Type':'application/json'},body:JSON.stringify({from:process.env.RESEND_FROM || 'JOKER YAZILIM <onboarding@resend.dev>',to:[process.env.QUOTE_TO || 'mustafaresat69@gmail.com'],reply_to:clean.email,subject:`Yeni Teklif: ${clean.type || 'Yazılım Projesi'} — ${clean.name}`,text})});
  const resendRaw=await r.text();
  let resendResult: {id?: string; message?: string; name?: string} = {};
  try { resendResult=resendRaw ? JSON.parse(resendRaw) : {}; } catch {}
  if(!r.ok && !resendResult.id){
    console.error('[quote] Resend API error', {status:r.status, body:resendRaw.slice(0,1000)});
    return NextResponse.json({ok:false,error:'E-posta gönderilemedi. Kayıt veritabanına alınmış olabilir; lütfen WhatsApp üzerinden de ulaşın.'},{status:502});
  }
  if (process.env.SEND_CUSTOMER_REPLY === 'true') {
    await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${apiKey}`,'Content-Type':'application/json'},body:JSON.stringify({from:process.env.RESEND_FROM || 'JOKER YAZILIM <onboarding@resend.dev>',to:[clean.email],subject:'JOKER YAZILIM — Talebinizi aldık',text:`Merhaba ${clean.name},\n\nProje talebinizi aldık. En kısa sürede sizinle iletişime geçeceğiz.\n\nJOKER YAZILIM\n0539 682 81 77\nmustafaresat69@gmail.com`})}).catch(()=>null);
  }
  return NextResponse.json({ok:true});
 }catch{return NextResponse.json({ok:false,error:'Beklenmeyen bir hata oluştu.'},{status:500});}
}
