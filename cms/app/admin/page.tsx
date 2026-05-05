'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const [reports, setReports] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const router = useRouter();

  // 🔥 CEK LOGIN
  useEffect(() => {
    const isLogin = localStorage.getItem('admin');
    if (!isLogin) {
      router.push('/login');
    }
  }, []);

  // DELETE
  const deleteReport = async (id: number) => {
    try {
      const res = await fetch(`http://127.0.0.1:3000/reports/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) return alert('Gagal hapus');

      setReports((prev) => prev.filter((r) => r.id !== id));
    } catch {
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
    } catch {
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

  // STAT
  const total = reports.length;
  const pending = reports.filter((r) => r.status === 'pending').length;
  const proses = reports.filter((r) => r.status === 'proses').length;
  const selesai = reports.filter((r) => r.status === 'selesai').length;

  // SEARCH
  const filteredReports = reports.filter((r) =>
    r.laporan.toLowerCase().includes(search.toLowerCase()) ||
    r.nama?.toLowerCase().includes(search.toLowerCase())
  );

  // 🔥 LOGOUT FUNCTION
  const handleLogout = () => {
    localStorage.removeItem('admin');
    router.push('/login');
  };

  return (
    <div>
      {/* NAVBAR */}
      <div style={navbar}>
        <h2>AduinAja! Admin</h2>
        <button style={logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* CONTENT */}
      <div style={container}>
        <h1>Dashboard Laporan</h1>

        {/* STAT */}
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
            <h3>Proses</h3>
            <p>{proses}</p>
          </div>

          <div style={statCard}>
            <h3>Selesai</h3>
            <p>{selesai}</p>
          </div>
        </div>

        {/* SEARCH */}
        <input
          placeholder="Cari laporan..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={searchInput}
        />

        {/* LIST */}
        {filteredReports.length === 0 ? (
          <p>Tidak ada laporan</p>
        ) : (
          filteredReports.map((r) => (
            <div key={r.id} style={card}>
              <p><b>Nama:</b> {r.nama}</p>
              <p><b>Pelaku:</b> {r.pelaku || '-'}</p>
              <p><b>Laporan:</b> {r.laporan}</p>

              {r.bukti && (
                <img
                  src={`http://127.0.0.1:3000/${r.bukti}`}
                  style={image}
                />
              )}

              <p>
                <b>Status:</b>{' '}
                <span
                  style={{
                    color:
                      r.status === 'pending'
                        ? '#f59e0b'
                        : r.status === 'proses'
                        ? '#3b82f6'
                        : '#16a34a',
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
    </div>
  );
}

// STYLE
const navbar = {
  backgroundColor: '#1e3a8a',
  color: 'white',
  padding: '15px 30px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const logoutBtn = {
  backgroundColor: 'white',
  color: '#1e3a8a',
  border: 'none',
  padding: '6px 12px',
  borderRadius: 6,
  cursor: 'pointer',
};

const container = {
  maxWidth: 900,
  margin: '30px auto',
  padding: 20,
};

const statsContainer = {
  display: 'flex',
  gap: 20,
  marginBottom: 20,
};

const statCard = {
  flex: 1,
  background: '#3b82f6',
  color: 'white',
  padding: 15,
  borderRadius: 10,
  textAlign: 'center' as const,
};

const searchInput = {
  marginBottom: 20,
  padding: 10,
  width: '100%',
  borderRadius: 8,
  border: '1px solid #ccc',
};

const card = {
  border: '1px solid #e5e7eb',
  borderRadius: 10,
  marginBottom: 15,
  padding: 15,
  backgroundColor: 'white',
  boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
};

const image = {
  width: '100%',
  maxHeight: 200,
  objectFit: 'cover' as const,
  marginTop: 10,
  borderRadius: 8,
};

const btnPrimary = {
  marginRight: 10,
  padding: '6px 12px',
  backgroundColor: '#2563eb',
  color: 'white',
  border: 'none',
  borderRadius: 5,
  cursor: 'pointer',
};

const btnDanger = {
  padding: '6px 12px',
  backgroundColor: '#dc2626',
  color: 'white',
  border: 'none',
  borderRadius: 5,
  cursor: 'pointer',
};