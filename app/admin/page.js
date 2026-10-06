"use client";
import { useState } from "react";

export default function AdminDashboard() {
  const [nomorDB, setNomorDB] = useState("");
  const [teksJualan, setTeksJualan] = useState("");
  const [speed, setSpeed] = useState("medium");
  const [qrCode, setQrCode] = useState("");

  const getQR = async () => {
    const res = await fetch("/api/wa");
    const data = await res.json();
    if (data.qr) setQrCode(data.qr);
    else alert("WhatsApp sudah terhubung atau sistem sedang memuat.");
  };

  const mulaiKirim = async () => {
    if (!nomorDB || !teksJualan) return alert("Isi nomor dan pesan!");
    alert(`Memulai pengiriman ke nomor database dengan mode ${speed}...`);
    await fetch("/api/blast", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ teksJualan, speed, nomorDB: nomorDB.split(",") })
    });
  };

  return (
    <div className="min-h-screen bg-white text-black p-6 md:p-12">
      <header className="mb-12 border-b-4 border-black pb-4">
        <h1 className="text-4xl font-black uppercase tracking-tighter">Panel Kontrol</h1>
        <p className="font-mono text-sm mt-2 font-bold">Admin: ewewaadmin5577</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Panel WhatsApp */}
        <div className="border-2 border-black p-6">
          <h2 className="text-2xl font-bold mb-6 uppercase border-b-2 border-black pb-2">Broadcast WhatsApp</h2>
          
          <div className="mb-6">
            <button onClick={getQR} className="bg-black text-white font-bold py-2 px-4 border-2 border-black hover:bg-white hover:text-black transition-colors">
              Tampilkan Barcode
            </button>
            {qrCode && <img src={qrCode} alt="QR Code" className="mt-4 border-2 border-black w-48 h-48 p-2" />}
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold mb-2 uppercase">Teks Jualan</label>
              <textarea 
                className="w-full p-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black rounded-none resize-none" 
                rows="4" 
                value={teksJualan} 
                onChange={(e) => setTeksJualan(e.target.value)}
              ></textarea>
            </div>
            
            <div>
              <label className="block text-sm font-bold mb-2 uppercase">Nomor Database (Pisahkan Koma)</label>
              <input 
                type="text" 
                className="w-full p-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black rounded-none" 
                value={nomorDB} 
                onChange={(e) => setNomorDB(e.target.value)} 
                placeholder="62812xxx, 62813xxx" 
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2 uppercase">Mode Pengiriman</label>
              <select 
                className="w-full p-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black rounded-none bg-white" 
                value={speed} 
                onChange={(e) => setSpeed(e.target.value)}
              >
                <option value="fast">Fast - Tanpa Jeda</option>
                <option value="medium">Medium - Jeda 5 Detik</option>
                <option value="slow">Slow - Jeda 10 Detik</option>
              </select>
            </div>

            <button onClick={mulaiKirim} className="w-full bg-black text-white font-black uppercase py-4 mt-4 border-2 border-black hover:bg-white hover:text-black transition-colors">
              Jalankan Pesan
            </button>
          </div>
        </div>

        {/* Panel Manajemen */}
        <div className="space-y-8">
          <div className="border-2 border-black p-6">
            <h2 className="text-xl font-bold mb-4 uppercase border-b-2 border-black pb-2">Penarikan Saldo</h2>
            <div className="flex justify-between items-center border-b-2 border-gray-200 py-3">
              <span className="font-mono font-semibold">User A - Rp 50.000</span>
              <button className="bg-black text-white px-4 py-1 text-sm font-bold border-2 border-black hover:bg-white hover:text-black transition-colors">SETUJUI</button>
            </div>
            <div className="flex justify-between items-center border-b-2 border-gray-200 py-3">
              <span className="font-mono font-semibold">User B - Rp 120.000</span>
              <button className="bg-black text-white px-4 py-1 text-sm font-bold border-2 border-black hover:bg-white hover:text-black transition-colors">SETUJUI</button>
            </div>
          </div>

          <div className="border-2 border-black p-6">
            <h2 className="text-xl font-bold mb-4 uppercase border-b-2 border-black pb-2">Kontrol Pengguna</h2>
            <div className="flex justify-between items-center border-b-2 border-gray-200 py-3">
              <span className="font-mono font-semibold">User B - Aktif</span>
              <button className="bg-red-600 text-white px-4 py-1 text-sm font-bold border-2 border-red-600 hover:bg-white hover:text-red-600 transition-colors">BANNED</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
