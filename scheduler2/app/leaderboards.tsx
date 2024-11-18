import { View, Text, StyleSheet } from 'react-native';

export default function Leaderboards() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leaderboards</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
