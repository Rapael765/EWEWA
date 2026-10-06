import { NextResponse } from 'next/server';
import makeWASocket, { useMultiFileAuthState } from '@whiskeysockets/baileys';
import QRCode from 'qrcode';

// Catatan: Di Vercel, folder /tmp akan terhapus secara acak.
let sock = null;
let qrData = null;

export async function GET() {
  if (!sock) {
    const { state, saveCreds } = await useMultiFileAuthState('/tmp/baileys_auth');
    sock = makeWASocket({
      auth: state,
      printQRInTerminal: false
    });

    sock.ev.on('connection.update', async (update) => {
      const { connection, qr } = update;
      if (qr) qrData = await QRCode.toDataURL(qr);
      if (connection === 'close') sock = null; // Reset kalau terputus
    });

    sock.ev.on('creds.update', saveCreds);
  }

  // Tunggu sejenak agar QR Code tergenerate
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  return NextResponse.json({ qr: qrData });
}
