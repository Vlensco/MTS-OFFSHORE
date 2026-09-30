import '../../css/admin.css';

export const metadata = {
  title: 'MTS OFFSHORE — Admin Content Management Console',
  description: 'Control panel for editing website content, texts, and media live.',
};

export default function AdminLayout({ children }) {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff', color: '#0c3247' }}>
      {children}
    </div>
  );
}

