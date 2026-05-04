'use client';
import { useEffect, useState } from 'react';

export default function AdminPage() {
  const [reports, setReports] = useState<any[]>([]);
  const [search, setSearch] = useState('');

  // DELETE
  const deleteReport = async (id: number) => {
    try {
      const res = await fetch(`http://127.0.0.1:3000/reports/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        alert('Gagal hapus');
        return;
      }

      setReports((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error(err);
      alert('Error hapus');
    }
  };

  // UPDATE STATUS
  const updateStatus = async (id: number) => {
    try {
      const res = await fetch(`http://127.0.0.1:3000/reports/${id}`, {
        method: 'PATCH',
      });

      const updated = await res.json();

      setReports((prev) =>
        prev.map((r) => (r.id === id ? updated : r))
      );
    } catch (err) {
      console.error(err);
      alert('Gagal update status');
    }
  };

  // GET DATA
  useEffect(() => {
    fetch('http://127.0.0.1:3000/reports')
      .then((res) => res.json())
      .then((data) => {
        setReports(Array.isArray(data) ? data : data.data || []);
      });
  }, []);

  // 🔥 STATISTIK
  const total = reports.length;
  const pending = reports.filter((r) => r.status === 'pending').length;
  const selesai = reports.filter((r) => r.status !== 'pending').length;

  // 🔥 SEARCH FILTER
  const filteredReports = reports.filter((r) =>
    r.laporan.toLowerCase().includes(search.toLowerCase()) ||
    r.nama?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: 20 }}>
      <h1>Dashboard Laporan</h1>

      {/* 🔥 STAT CARDS */}
      <div style={statsContainer}>
        <div style={statCard}>
          <h3>Total</h3>
          <p>{total}</p>
        </div>

        <div style={statCard}>
          <h3>Pending</h3>
          <p>{pending}</p>
        </div>

        <div style={statCard}>
          <h3>Selesai</h3>
          <p>{selesai}</p>
        </div>
      </div>

      {/* 🔍 SEARCH */}
      <input
        placeholder="Cari laporan..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          marginBottom: 20,
          padding: 10,
          width: '100%',
          borderRadius: 8,
          border: '1px solid #ccc',
        }}
      />

      {/* LIST */}
      {filteredReports.length === 0 ? (
        <p>Tidak ada laporan</p>
      ) : (
        filteredReports.map((r) => (
          <div
            key={r.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: 10,
              marginBottom: 15,
              padding: 15,
              backgroundColor: '#f9f9f9',
            }}
          >
            <p><b>Nama:</b> {r.nama}</p>
            <p><b>Pelaku:</b> {r.pelaku || '-'}</p>
            <p><b>Laporan:</b> {r.laporan}</p>

            <p>
              <b>Status:</b>{' '}
              <span
                style={{
                  color: r.status === 'pending' ? 'orange' : 'green',
                  fontWeight: 'bold',
                }}
              >
                {r.status}
              </span>
            </p>

            <div style={{ marginTop: 10 }}>
              <button
                onClick={() => updateStatus(r.id)}
                style={btnPrimary}
              >
                Ubah Status
              </button>

              <button
                onClick={() => deleteReport(r.id)}
                style={btnDanger}
              >
                Hapus
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

// STYLE
const statsContainer = {
  display: 'flex',
  gap: 20,
  marginBottom: 20,
};

const statCard = {
  flex: 1,
  background: '#2b6cb0',
  color: 'white',
  padding: 15,
  borderRadius: 10,
  textAlign: 'center' as const,
};

const btnPrimary = {
  marginRight: 10,
  padding: '5px 10px',
  backgroundColor: '#2b6cb0',
  color: 'white',
  border: 'none',
  borderRadius: 5,
  cursor: 'pointer',
};

const btnDanger = {
  padding: '5px 10px',
  backgroundColor: 'red',
  color: 'white',
  border: 'none',
  borderRadius: 5,
  cursor: 'pointer',
};