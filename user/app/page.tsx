'use client';
import { useState } from 'react';

export default function Home() {
  const [nama, setNama] = useState('');
  const [pelaku, setPelaku] = useState('');
  const [laporan, setLaporan] = useState('');
  const [bukti, setBukti] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('nama', nama);
      formData.append('pelaku', pelaku);
      formData.append('laporan', laporan);
      if (bukti) formData.append('bukti', bukti);

      const res = await fetch('http://127.0.0.1:3000/reports', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error();

      alert('✅ Laporan berhasil dikirim!');
      setNama('');
      setPelaku('');
      setLaporan('');
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
        <h1 style={{ textAlign: 'center' }}>🛡️ Safe School</h1>
        <p style={subtitle}>Laporkan bullying secara aman & anonim</p>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Nama (boleh anonim)"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            style={input}
          />

          <input
            placeholder="Nama Pelaku"
            value={pelaku}
            onChange={(e) => setPelaku(e.target.value)}
            style={input}
          />

          <textarea
            placeholder="Ceritakan kejadian..."
            value={laporan}
            onChange={(e) => setLaporan(e.target.value)}
            style={{ ...input, height: 100 }}
          />

          <input
            type="file"
            onChange={(e) => setBukti(e.target.files?.[0] || null)}
            style={{ marginTop: 10 }}
          />

          <button type="submit" disabled={loading} style={button}>
            {loading ? 'Mengirim...' : '🚀 Kirim Laporan'}
          </button>
        </form>
      </div>
    </div>
  );
}

const container = {
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'linear-gradient(135deg, #667eea, #764ba2)',
};

const card = {
  background: 'white',
  padding: 25,
  borderRadius: 12,
  width: 400,
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
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: 8,
  cursor: 'pointer',
};