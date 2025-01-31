import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Pressable, ScrollView, Modal } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import AssignmentCard from '../../components/AssignmentCard';
import Entypo from '@expo/vector-icons/Entypo';

const ip = '192.168.1.95:8000';

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
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [questProgress, setQuestProgress] = useState<{ [key: number]: number }>({
    1: 0,
    2: 0,
    3: 0,
  });

  const testQuests = [
    { id: 1, description: 'Complete 3 assignments', progress: questProgress[1], goal: 3 },
    { id: 2, description: 'Complete 5 overdue assignments', progress: questProgress[2], goal: 5 },
    { id: 3, description: 'Complete 1 assignment from each class', progress: questProgress[3], goal: 3 },
  ];

  useEffect(() => {
    const fetchAssignments = async () => {
      const cookie = await SecureStore.getItemAsync('cookie');

      if (!cookie) {
        setError('No cookie found. Please login again.');
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.post(`http://${ip}/getAssignments`, { cookie });
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
        
        <View style={styles.headerRow}>
          <Text style={styles.username}>Username</Text>
          
          <Pressable
            style={styles.modalButton}
            onPress={() => setModalVisible(true)}
          >
            <Entypo name="dots-three-horizontal" size={24} color="white" />
          </Pressable>
        </View>

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

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Quests</Text>
            <ScrollView style={styles.questList}>
              {testQuests.map((quest) => (
                <View key={quest.id} style={styles.questItem}>
                  <Text style={styles.questDescription}>{quest.description}</Text>
                  <Text style={styles.questProgress}>
                    Progress: {quest.progress}/{quest.goal}
                  </Text>
                </View>
              ))}
            </ScrollView>
            <Pressable onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  modalButton: {
    padding: 10,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#111111',
    padding: 20,
    borderRadius: 10,
    width: 300,
    height: 400, 
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  questList: {
    flex: 1,
    marginTop: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    color: '#ffffff',
  },
  closeButton: {
    backgroundColor: '#7e22ce',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    position: 'absolute',
    bottom: 20,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  questItem: {
    marginBottom: 20,
    alignItems: 'center',
  },
  questDescription: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
  },
  questProgress: {
    color: '#737373',
    fontSize: 14,
    textAlign: 'center',
  },
});
