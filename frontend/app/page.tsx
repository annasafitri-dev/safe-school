'use client';
import { useState } from 'react';

export default function Home() {
  const [nama, setNama] = useState('');
  const [laporan, setLaporan] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    console.log("CLICKED"); // 🔥 cek kepencet atau nggak

    try {
      const res = await fetch('http://127.0.0.1:3000/reports', { // 🔥 ganti localhost
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nama, laporan }),
      });

      console.log("STATUS:", res.status); // 🔥 lihat status

      const data = await res.json();
      console.log("DATA:", data); // 🔥 lihat response backend

      if (!res.ok) {
        throw new Error('Gagal kirim');
      }

      alert('Laporan terkirim!');
      setNama('');
      setLaporan('');
    } catch (err) {
      console.error("ERROR:", err);
      alert('Gagal kirim laporan');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Form Laporan Bullying</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Nama (boleh anonim)"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
        />
        <br /><br />

        <textarea
          placeholder="Isi laporan"
          value={laporan}
          onChange={(e) => setLaporan(e.target.value)}
        />
        <br /><br />

        <button type="submit">Kirim</button>
      </form>
    </div>
  );
}