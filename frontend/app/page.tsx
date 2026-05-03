'use client';
import { useState } from 'react';

export default function Home() {
  const [nama, setNama] = useState('');
  const [laporan, setLaporan] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('http://127.0.0.1:3000/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nama, laporan }),
      });

      if (!res.ok) throw new Error();

      alert('✅ Laporan berhasil dikirim!');
      setNama('');
      setLaporan('');
    } catch {
      alert('❌ Gagal kirim laporan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea, #764ba2)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'sans-serif',
      }}
    >
      <div
        style={{
          width: 420,
          padding: 30,
          borderRadius: 16,
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          color: 'white',
        }}
      >
        <h1 style={{ textAlign: 'center', marginBottom: 10 }}>
          🛡️ Safe School
        </h1>

        <p
          style={{
            textAlign: 'center',
            fontSize: 14,
            opacity: 0.8,
            marginBottom: 20,
          }}
        >
          Laporkan bullying secara aman & anonim
        </p>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Nama (boleh anonim)"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            style={inputStyle}
          />

          <textarea
            placeholder="Ceritakan kejadian..."
            value={laporan}
            onChange={(e) => setLaporan(e.target.value)}
            style={{ ...inputStyle, height: 100 }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              marginTop: 15,
              padding: 12,
              borderRadius: 10,
              border: 'none',
              background: loading
                ? '#999'
                : 'linear-gradient(135deg, #ff7e5f, #feb47b)',
              color: 'white',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: '0.3s',
            }}
          >
            {loading ? 'Mengirim...' : '🚀 Kirim Laporan'}
          </button>
        </form>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: 12,
  marginTop: 10,
  borderRadius: 10,
  border: 'none',
  outline: 'none',
  fontSize: 14,
};