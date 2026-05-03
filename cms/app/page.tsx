'use client';
import { useEffect, useState } from 'react';

export default function AdminPage() {
  const [reports, setReports] = useState<any[]>([]);

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
    } catch {
      alert('Error hapus');
    }
  };

  const updateStatus = async (id: number) => {
    try {
      const res = await fetch(`http://127.0.0.1:3000/reports/${id}`, {
        method: 'PATCH',
      });

      const updated = await res.json();

      setReports((prev) =>
        prev.map((r) => (r.id === id ? updated : r))
      );
    } catch {
      alert('Gagal update status');
    }
  };

  useEffect(() => {
    fetch('http://127.0.0.1:3000/reports')
      .then((res) => res.json())
      .then((data) => {
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
          <div key={r.id} style={card}>
            <p><b>Nama:</b> {r.nama}</p>
            <p><b>Pelaku:</b> {r.pelaku || '-'}</p>
            <p><b>Laporan:</b> {r.laporan}</p>

            <p>
              <b>Status:</b>{' '}
              <span style={{
                color: r.status === 'pending' ? 'orange' : 'green',
                fontWeight: 'bold'
              }}>
                {r.status}
              </span>
            </p>

            <button onClick={() => updateStatus(r.id)}>Ubah Status</button>
            <button onClick={() => deleteReport(r.id)}>Hapus</button>
          </div>
        ))
      )}
    </div>
  );
}