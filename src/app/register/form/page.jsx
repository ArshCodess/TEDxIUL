import { Suspense } from 'react';
import RegistrationForm from '../../../components/RegistrationForm';
import Footer from '../../../components/Footer';

export default function Page() {
  return (
    <div
      style={{
        padding: '40px 24px 0',
        minHeight: '100vh',
        boxSizing: 'border-box',
        background: '#070707',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Suspense fallback={<div>Loading registration form...</div>}>
        <RegistrationForm />
      </Suspense>
      <Footer />
    </div>
  );
}