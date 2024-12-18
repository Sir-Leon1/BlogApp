import React from 'react';
import header from '../components/header.jsx';
import AuthForm from '../components/AuthForm.jsx';

function LoginRegistrationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100">

      <main className="flex items-center justify-center p-4 pt-20">
        <AuthForm />
      </main>
    </div>
  );
}

export default LoginRegistrationPage;