'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <div style={nav}>
      <div style={logo}>AduinAja!</div>

      <div style={menu}>
        <Link href="/" style={link}>Home</Link>
        <Link href="/lapor" style={link}>Lapor</Link>
        <Link href="/login" style={link}>Login</Link>
      </div>
    </div>
  );
}

const nav = {
  position: 'fixed' as const,
  top: 0,
  left: 0,
  width: '100%',
  backgroundColor: '#2b6cb0',
  color: 'white',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '15px 30px',
  zIndex: 1000,
};

const logo = {
  fontWeight: 'bold',
  fontSize: 18,
};

const menu = {
  display: 'flex',
  gap: 20,
};

const link = {
  color: 'white',
  textDecoration: 'none',
  fontSize: 14,
};