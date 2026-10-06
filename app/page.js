"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "ewewaadmin5577" && password === "Rapael2008") {
      router.push("/admin");
    } else {
      alert("Login User Berhasil!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black p-4">
      <div className="w-full max-w-sm border-2 border-black p-8 bg-white">
        <h2 className="text-3xl font-black mb-8 uppercase tracking-tighter">Masuk.</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-bold mb-2 uppercase">Username</label>
            <input 
              type="text" 
              className="w-full p-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black rounded-none bg-transparent" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2 uppercase">Password</label>
            <input 
              type="password" 
              className="w-full p-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black rounded-none bg-transparent" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="w-full bg-black text-white font-bold uppercase py-3 px-4 border-2 border-black hover:bg-white hover:text-black transition-colors duration-200">
            Akses Sistem
          </button>
        </form>
      </div>
    </div>
  );
}
