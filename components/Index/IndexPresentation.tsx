import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';

const IndexPresentation = ({ handleLogout, handleNavigateToChineseSearch }) => {
  return (
    <View style={styles.container}>
      <Text>Welcome to the Index Page</Text>
      <TouchableOpacity style={styles.card} onPress={handleNavigateToChineseSearch}>
        <Text style={styles.cardText}>Go to Chinese Search</Text>
      </TouchableOpacity>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  card: {
    width: '80%',
    padding: 16,
    marginVertical: 10,
    backgroundColor: '#f9c2ff',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  cardText: {
    fontSize: 18,
    color: '#000',
  },
});

export default IndexPresentation;
