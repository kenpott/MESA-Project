import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

interface QuestCardProps {
  questTitle: string;
  description: string;
  status: 'pending' | 'completed';
  onComplete: () => void;
}

const QuestCard: React.FC<QuestCardProps> = ({ questTitle, description, status, onComplete }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{questTitle}</Text>
      <Text style={styles.description}>{description}</Text>
      <Pressable 
        style={[styles.button, status === 'completed' ? styles.completed : styles.pending]} 
        onPress={onComplete}
      >
        <Text style={styles.buttonText}>{status === 'completed' ? 'Completed' : 'Mark as Complete'}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1c1c1c',
    padding: 15,
    borderRadius: 20,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  description: {
    fontSize: 14,
    color: '#737373',
    marginVertical: 8,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  completed: {
    backgroundColor: '#7e22ce',
  },
  pending: {
    backgroundColor: '#555555',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default QuestCard;
