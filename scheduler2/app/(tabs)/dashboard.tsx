import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Pressable, ScrollView } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import AssignmentCard from '../../components/AssignmentCard';

interface Assignment {
  id: number;
  title: string;
  class: string;
  description: string;
  dueDate: string;
  files?: string[];
  links?: string[];
  status: 'upcoming' | 'overdue' | 'completed';
  coins: number;
  exp: number;
  type: string;
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'overdue'>('upcoming');
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState<number | null>(null);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchAssignments = async () => {
      const cookie = await SecureStore.getItemAsync('cookie');
  
      if (!cookie) {
        setError('No cookie found. Please login again.');
        setIsLoading(false);
        return;
      }
  
      try {
        const response = await axios.post('http://192.168.1.95:8000/getAssignments', { cookie });
        
        if (response.status === 200) {
          const data = response.data;
  
          if (data.overdue && data.upcoming) {
            const mapAssignments = (assignmentsData: any, status: 'upcoming' | 'overdue') =>
              Object.entries(assignmentsData).map(([id, assignment]: [string, any]) => ({
                ...assignment,
                id,
                status,
                dueDate: new Date(assignment.duedate * 1000).toLocaleString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                  year: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
                }).replace(',', '')
              }));
  
            const combinedAssignments = [
              ...mapAssignments(data.overdue, 'overdue'),
              ...mapAssignments(data.upcoming, 'upcoming'),
            ];
  
            setAssignments(combinedAssignments);
          } else {
            setError('Assignments data is not in the correct format.');
          }
        } else {
          setError('Failed to load assignments.');
        }
      } catch (err) {
        setError('An error occurred while fetching assignments.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchAssignments();
  }, []);  
  
  const toggleDropdown = (assignmentId: number) => {
    setShowDropdown(showDropdown === assignmentId ? null : assignmentId);
  };

  const filteredAssignments = assignments.filter(
    (assignment) => assignment.status === activeTab
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcome}>Welcome!</Text>
        <Text style={styles.username}>Username</Text>
        <Text style={styles.title}>Dashboard</Text>
        <Text style={styles.subtitle}>Your Assignments</Text>
        <View style={styles.assignmentTypeCard}>
          {['upcoming', 'overdue'].map((tab) => (
            <Pressable
              key={tab}
              onPress={() => setActiveTab(tab as 'upcoming' | 'overdue')}
              onPressIn={() => setHoveredTab(tab)}
              onPressOut={() => setHoveredTab(null)}
              style={[
                styles.assignmentTypeButton,
                activeTab === tab
                  ? styles.activeTab
                  : hoveredTab === tab
                  ? styles.hoveredTab
                  : styles.inactiveTab,
              ]}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab ? styles.activeText : styles.inactiveText,
                ]}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <ScrollView style={styles.assignmentList}>
        {isLoading ? (
          <Text style={styles.messageText}>Loading...</Text>
        ) : error ? (
          <Text style={styles.messageText}>{error}</Text>
        ) : filteredAssignments.length === 0 ? (
          <Text style={styles.messageText}>No assignments found.</Text>
        ) : (
          filteredAssignments.map((assignment) => (
            <AssignmentCard
              key={assignment.id}
              assignment={assignment}
              showDropdown={showDropdown}
              toggleDropdown={toggleDropdown}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111',
    paddingVertical: 24,
  },
  header: {
    padding: 20,
  },
  welcome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#737373',
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    paddingTop: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#737373',
    marginTop: 5,
  },
  assignmentTypeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  assignmentTypeButton: {
    padding: 8,
    borderRadius: 9999,
    textAlign: 'center',
    marginRight: 10,
  },
  activeTab: {
    backgroundColor: '#7e22ce',
  },
  hoveredTab: {
    backgroundColor: '#1c1c1c',
  },
  inactiveTab: {
    backgroundColor: '#1f1f1f',
  },
  tabText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  activeText: {
    color: '#ffffff',
  },
  inactiveText: {
    color: '#737373',
  },
  assignmentList: {
    marginTop: 20,
  },
  messageText: {
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 20,
  },
});
