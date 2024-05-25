import React, { useState } from 'react';
import { View, Button, TextInput, StyleSheet } from 'react-native';

import AuthService from '../../services/Auth/AuthService';
import LoginPresentation from './LoginPresentation';

const LoginContainer = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (AuthService.login(username, password)) {
      navigation.replace('Index');
    } else {
      alert('Login failed');
    }
  };

  return (
    <LoginPresentation
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      handleLogin={handleLogin}
    />
  );
};

export default LoginContainer;
