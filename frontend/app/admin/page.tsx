'use client';
import { useEffect, useState } from 'react';

export default function AdminPage() {
  const [reports, setReports] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://127.0.0.1:3000/reports')
      .then((res) => res.json())
      .then((data) => {
        console.log("DATA:", data);
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
          </div>
        ))
      )}
    </div>
  );
}