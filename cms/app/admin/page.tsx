'use client';
import { useEffect, useState } from 'react';

export default function AdminPage() {
  const [reports, setReports] = useState<any[]>([]);

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

  // GET DATA (🔥 FIX DI SINI)
  useEffect(() => {
    fetch('http://127.0.0.1:3000/reports')
      .then((res) => res.json())
      .then((data) => {
        // 🔥 HANDLE kalau bukan array
        setReports(Array.isArray(data) ? data : data.data || []);
      });
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Dashboard Laporan</h1>

      {reports.length === 0 ? (
        <p>Belum ada laporan</p>
      ) : (
        reports.map((r) => (
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

            {/* STATUS */}
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

            {/* BUTTON */}
            <div style={{ marginTop: 10 }}>
              <button
                onClick={() => updateStatus(r.id)}
                style={{
                  marginRight: 10,
                  padding: '5px 10px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: 5,
                  cursor: 'pointer',
                }}
              >
                Ubah Status
              </button>

              <button
                onClick={() => deleteReport(r.id)}
                style={{
                  padding: '5px 10px',
                  backgroundColor: 'red',
                  color: 'white',
                  border: 'none',
                  borderRadius: 5,
                  cursor: 'pointer',
                }}
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