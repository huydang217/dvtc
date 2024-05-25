import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import ChineseSearchPresentation from './ChineseSearchPresentation';
import AuthService from '../../services/Auth/AuthService';

const ChineseSearchContainer = ({ navigation }) => {
  useEffect(() => {
    if (!AuthService.checkAuth()) {
      navigation.replace('Login');
    }
  }, []);

  return <ChineseSearchPresentation />;
};

export default ChineseSearchContainer;
