import React, { useState } from 'react';
import { auth, signInWithEmailAndPassword, RecaptchaVerifier } from './firebaseConfig';
// import { signInWithEmailAndPassword, RecaptchaVerifier, signOut } from 'firebase/auth';
import SignUpForm from './SignUpForm';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [recaptchaContainer, setRecaptchaContainer] = useState(null);
  const [recaptchaVerifier, setRecaptchaVerifier] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
  
    if (!recaptchaVerifier) {
      const verifier = new RecaptchaVerifier(recaptchaContainer, {}, auth);
      setRecaptchaVerifier(verifier);
    }
  
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password, {
        recaptchaVerifier,
      });
      console.log("User signed in:", userCredential.user);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const toggleSignUpForm = () => {
    setShowSignUpForm(!showSignUpForm);
  };

  if (showSignUpForm) {
    return <SignUpForm />;
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        <button type="button" onClick={toggleSignUpForm}>
          Sign Up
        </button>
      </form>
      <div ref={setRecaptchaContainer}></div>
    </div>
  );
};

export {Login};