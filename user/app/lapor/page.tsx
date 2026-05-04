'use client';
import { useState } from 'react';

export default function Lapor() {
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

      alert('Laporan berhasil dikirim');
      setNama('');
      setLaporan('');
      setLokasi('');
      setKategori('');
      setBukti(null);
    } catch {
      alert('Gagal kirim laporan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={container}>
      <div style={content}>

        <h1 style={title}>Buat Laporan</h1>
        <p style={subtitle}>
          Isi form di bawah untuk menyampaikan laporan Anda
        </p>

        <form onSubmit={handleSubmit} style={form}>

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
            style={{ ...input, height: 120 }}
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
            {loading ? 'Mengirim...' : 'Kirim Laporan'}
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
  background: '#f5f7fa', // beda dikit dari landing biar kontras
};

const content = {
  width: '100%',
  maxWidth: 600, // 🔥 lebih besar dari sebelumnya
  background: 'white',
  padding: 30,
  borderRadius: 12,
  boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
};

const title = {
  fontSize: 28,
  marginBottom: 5,
};

const subtitle = {
  marginBottom: 20,
  color: '#666',
};

const form = {
  display: 'flex',
  flexDirection: 'column' as const,
};

const input = {
  marginTop: 10,
  padding: 12,
  borderRadius: 8,
  border: '1px solid #ccc',
  fontSize: 14,
};

const button = {
  marginTop: 15,
  padding: 12,
  backgroundColor: '#2b6cb0',
  color: 'white',
  border: 'none',
  borderRadius: 8,
  fontSize: 16,
  cursor: 'pointer',
};