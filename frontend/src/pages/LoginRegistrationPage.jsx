import React from 'react';
import header from '../components/layout/header.jsx';
import AuthForm from '../components/loginReg/AuthForm.jsx';

function LoginRegistrationPage() {
  return (
    <div className="min-h-screen bg-gray-800 justify-center items-center align-middle flex">

      <main className="flex items-center align-middle justify-center p-4 ">
        <AuthForm />
      </main>
    </div>
  );
}

export default LoginRegistrationPage;