import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const IndexPresentation = ({ handleLogout }) => {
  return (
    <View style={styles.container}>
      <Text>Welcome to the Index Page</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default IndexPresentation;
