import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import IndexPresentation from './IndexPresentation';
import AuthService from '../../services/Auth/AuthService';


const IndexContainer = ({ navigation }) => {
  useEffect(() => {
    if (!AuthService.checkAuth()) {
      navigation.replace('Login');
    }
  }, []);

  const handleLogout = () => {
    AuthService.logout();
    navigation.replace('Login');
  };

  return <IndexPresentation handleLogout={handleLogout} />;
};

export default IndexContainer;
