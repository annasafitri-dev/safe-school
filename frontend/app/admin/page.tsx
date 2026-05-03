'use client';
import { useEffect, useState } from 'react';

export default function AdminPage() {
  const [reports, setReports] = useState<any[]>([]);

  // 🔥 FIX: function HARUS di atas
  const deleteReport = async (id: number) => {
    try {
      const res = await fetch(`http://127.0.0.1:3000/reports/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        alert('Gagal hapus');
        return;
      }

      // update UI setelah hapus
      setReports((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error(err);
      alert('Error hapus');
    }
  };

  // ambil data
  useEffect(() => {
    fetch('http://127.0.0.1:3000/reports')
      .then((res) => res.json())
      .then((data) => {
        setReports(data);
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
              border: '1px solid black',
              marginBottom: 10,
              padding: 10,
            }}
          >
            <p><b>Nama:</b> {r.nama}</p>
            <p><b>Laporan:</b> {r.laporan}</p>

            <button onClick={() => deleteReport(r.id)}>
              Hapus
            </button>
          </div>
        ))
      )}
    </div>
  );
}