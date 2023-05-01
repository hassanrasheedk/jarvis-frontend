import React, { useState } from 'react';
import { auth, signInWithEmailAndPassword, RecaptchaVerifier } from './firebaseConfig';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

import SignUpForm from './SignUpForm';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [recaptchaContainer, setRecaptchaContainer] = useState(null);
  const [recaptchaVerifier, setRecaptchaVerifier] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const errorMessages = {
    'auth/user-not-found': 'User not found. Please check your email and try again.',
    'auth/wrong-password': 'Incorrect password. Please try again.',
    'auth/invalid-email': 'Invalid email address. Please check your email and try again.',
    'auth/too-many-requests': 'Too many unsuccessful login attempts. Please try again later.',
    // Add other error codes and messages as needed
  };
  
  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // User signed in with Google
        console.log('User signed in with Google:', result.user);
      })
      .catch((error) => {
        console.error('Error signing in with Google:', error);
        setErrorMessage(error);
      });
  };

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
      setErrorMessage(errorMessages[error.code] || error.message);
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
      <button onClick={handleGoogleSignIn}>Sign in with Google</button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div ref={setRecaptchaContainer}></div>
    </div>
  );
};

export {Login};