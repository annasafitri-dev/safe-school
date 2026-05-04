'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div style={container}>
      <div style={content}>
        
        <h1 style={title}>AduinAja!</h1>

        <p style={subtitle}>
          Platform pengaduan masyarakat untuk menyampaikan laporan secara cepat, aman, dan terstruktur.
        </p>

        <div style={buttonContainer}>
          <Link href="/lapor">
            <button style={buttonPrimary}>Buat Laporan</button>
          </Link>

          <Link href="/login">
            <button style={buttonSecondary}>Login Admin</button>
          </Link>
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
  background: 'linear-gradient(135deg, #4facfe, #00c6ff)',
};

const content = {
  textAlign: 'center' as const,
  maxWidth: 700, // 🔥 lebih lebar
  padding: 20,
  color: 'white',
};

const title = {
  fontSize: 42, // 🔥 lebih besar
  fontWeight: 'bold',
  marginBottom: 10,
};

const subtitle = {
  fontSize: 18,
  marginBottom: 30,
  lineHeight: 1.6,
};

const buttonContainer = {
  display: 'flex',
  justifyContent: 'center',
  gap: 15,
  marginBottom: 40,
};

const buttonPrimary = {
  padding: '12px 25px',
  backgroundColor: 'white',
  color: '#2b6cb0',
  border: 'none',
  borderRadius: 8,
  fontSize: 16,
  cursor: 'pointer',
};

const buttonSecondary = {
  padding: '12px 25px',
  backgroundColor: 'transparent',
  color: 'white',
  border: '1px solid white',
  borderRadius: 8,
  fontSize: 16,
  cursor: 'pointer',
};

const flow = {
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: 14,
  opacity: 0.9,
};