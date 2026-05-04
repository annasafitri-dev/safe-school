'use client';
import { useState } from 'react';

export default function Home() {
  const [nama, setNama] = useState('');
  const [laporan, setLaporan] = useState('');
  const [lokasi, setLokasi] = useState('');
  const [kategori, setKategori] = useState('');
  const [bukti, setBukti] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('nama', nama);
      formData.append('laporan', laporan);
      formData.append('lokasi', lokasi);
      formData.append('kategori', kategori);
      if (bukti) formData.append('bukti', bukti);

      const res = await fetch('http://127.0.0.1:3000/reports', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error();

      alert('✅ Laporan berhasil dikirim!');
      setNama('');
      setLaporan('');
      setLokasi('');
      setKategori('');
      setBukti(null);
    } catch (err) {
      console.error(err);
      alert('❌ Gagal kirim laporan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={container}>
      <div style={card}>
        
        {/* 🔵 HERO */}
        <h1 style={title}>AduinAja!</h1>
        <p style={subtitle}>
          Sampaikan laporan di sekitar kamu dengan mudah dan aman
        </p>

        <form onSubmit={handleSubmit}>
          
          <input
            placeholder="Nama (opsional)"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            style={input}
          />

          <textarea
            placeholder="Tulis laporan..."
            value={laporan}
            onChange={(e) => setLaporan(e.target.value)}
            style={{ ...input, height: 100 }}
          />

          <input
            placeholder="Lokasi kejadian"
            value={lokasi}
            onChange={(e) => setLokasi(e.target.value)}
            style={input}
          />

          <select
            value={kategori}
            onChange={(e) => setKategori(e.target.value)}
            style={input}
          >
            <option value="">Pilih kategori</option>
            <option value="lingkungan">Lingkungan</option>
            <option value="keamanan">Keamanan</option>
            <option value="infrastruktur">Infrastruktur</option>
          </select>

          <input
            type="file"
            onChange={(e) => setBukti(e.target.files?.[0] || null)}
            style={{ marginTop: 10 }}
          />

          <button type="submit" disabled={loading} style={button}>
            {loading ? 'Mengirim...' : '🚀 Kirim Laporan'}
          </button>
        </form>

        {/* 🔽 FLOW (biar keliatan pro) */}
        <div style={flow}>
          <p>📩 Kirim laporan</p>
          <p>🔍 Dicek admin</p>
          <p>⚙️ Diproses</p>
          <p>✅ Selesai</p>
        </div>

      </div>
    </div>
  );
}

const container = {
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'linear-gradient(135deg, #4facfe, #00c6ff)', // 🔵 biru
};

const card = {
  background: 'white',
  padding: 25,
  borderRadius: 12,
  width: 400,
  boxShadow: '0 8px 20px rgba(0,0,0,0.1)', // 🔥 biar ga polos
};

const title = {
  textAlign: 'center' as const,
  color: '#2b6cb0',
};

const subtitle = {
  textAlign: 'center' as const,
  fontSize: 14,
  marginBottom: 15,
  color: '#666',
};

const input = {
  width: '100%',
  padding: 10,
  marginTop: 10,
  borderRadius: 8,
  border: '1px solid #ccc',
};

const button = {
  width: '100%',
  marginTop: 15,
  padding: 10,
  backgroundColor: '#2b6cb0',
  color: 'white',
  border: 'none',
  borderRadius: 8,
  cursor: 'pointer',
};

const flow = {
  marginTop: 20,
  fontSize: 13,
  color: '#555',
  display: 'flex',
  justifyContent: 'space-between',
};