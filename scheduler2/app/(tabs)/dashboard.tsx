import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Pressable, ScrollView } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState<string | null>(null);
  const [assignments, setAssignments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchAssignments = async () => {
      const cookie = await SecureStore.getItemAsync("cookie");

      if (!cookie) {
        setError('No cookie found. Please login again.');
        setIsLoading(false);
        return;
      }
      try {
        const response = await axios.get('http://192.168.1.95:8000/get-assignments', {
          headers: {
            Authorization: `Bearer ${cookie}`,
          },
        });
        if (response.status === 200) {
          setAssignments(response.data);
        } else {
          setError('Failed to load assignments.');
        }
      } catch (err) {
        setError('An error occurred while fetching assignments.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchAssignments();
  }, []);

  const toggleDropdown = (assignmentId: string) => {
    setShowDropdown(showDropdown === assignmentId ? null : assignmentId);
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.assignmentCard} key={item.id}>
      <View style={styles.assignmentHeader}>
        <Text style={styles.assignmentTitle}>{item.title}</Text>
        <Text style={[styles.assignmentStatus, getStatusColor(item.status)]}>
          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
        </Text>
      </View>
      <Text style={styles.assignmentDate}>Due Date: {item.dueDate}</Text>
      <Pressable onPress={() => toggleDropdown(item.id)} style={styles.dropdownButton}>
        <Text style={styles.dropdownText}>Show Details</Text>
      </Pressable>
      {showDropdown === item.id && (
        <View style={styles.dropdown}>
          <Text style={styles.assignmentDescription}>{item.description}</Text>
          <View style={styles.extraInfo}>
            <Text style={styles.extraInfoText}>Instructions: {item.instructions}</Text>
            <Text style={styles.extraInfoText}>Attachment: [Download PDF]</Text>
            <Text style={styles.extraInfoText}>Link: [Click here for resources]</Text>
          </View>
          <View style={styles.assignmentFooter}>
            <Text style={styles.assignmentCurrency}>+{item.coins} Coins</Text>
            <Text style={styles.assignmentExp}>+{item.exp} EXP</Text>
          </View>
        </View>
      )}
    </View>
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'overdue':
        return styles.overdueStatus;
      case 'completed':
        return styles.completedStatus;
      case 'upcoming':
        return styles.upcomingStatus;
      default:
        return styles.upcomingStatus;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcome}>Welcome!</Text>
        <Text style={styles.username}>Username</Text>
        <Text style={styles.title}>Dashboard</Text>
        <Text style={styles.subtitle}>Your Assignments</Text>
        <View style={styles.assignmentTypeCard}>
          <Pressable
            onPress={() => setActiveTab('upcoming')}
            onPressIn={() => setHoveredTab('upcoming')}
            onPressOut={() => setHoveredTab(null)}
            style={[
              styles.assignmentTypeButton,
              activeTab === 'upcoming'
                ? styles.activeTab
                : hoveredTab === 'upcoming'
                ? styles.hoveredTab
                : styles.inactiveTab,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'upcoming' ? styles.activeText : styles.inactiveText,
              ]}
            >
              Upcoming
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setActiveTab('overdue')}
            onPressIn={() => setHoveredTab('overdue')}
            onPressOut={() => setHoveredTab(null)}
            style={[
              styles.assignmentTypeButton,
              activeTab === 'overdue'
                ? styles.activeTab
                : hoveredTab === 'overdue'
                ? styles.hoveredTab
                : styles.inactiveTab,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'overdue' ? styles.activeText : styles.inactiveText,
              ]}
            >
              Overdue
            </Text>
          </Pressable>
        </View>
      </View>

      {/* ScrollView for assignments */}
      <ScrollView style={styles.assignmentList}>
        {/* Sample Assignment Card */}
        <View style={styles.assignmentCard}>
          <View style={styles.assignmentHeader}>
            <Text style={styles.assignmentTitle}>Math Assignment</Text>
            <Text style={[styles.assignmentStatus, getStatusColor('upcoming')]}>Upcoming</Text>
          </View>
          <Text style={styles.assignmentDate}>Due Date: 12/15/2024</Text>
          <Pressable onPress={() => toggleDropdown('math')} style={styles.dropdownButton}>
            <Text style={styles.dropdownText}>Show Details</Text>
          </Pressable>
          {showDropdown === 'math' && (
            <View style={styles.dropdown}>
              <Text style={styles.assignmentDescription}>This is a math assignment focused on algebra. It involves solving equations and inequalities.</Text>
              <View style={styles.extraInfo}>
                <Text style={styles.extraInfoText}>Instructions: Please complete the exercises in the textbook and submit your answers online.</Text>
                <Text style={styles.extraInfoText}>Attachment: [Download PDF]</Text>
                <Text style={styles.extraInfoText}>Link: [Click here for resources]</Text>
              </View>
              <View style={styles.assignmentFooter}>
                <Text style={styles.assignmentCurrency}>+10 Coins</Text>
                <Text style={styles.assignmentExp}>+0.1 EXP</Text>
              </View>
            </View>
          )}
        </View>

        <View style={styles.assignmentCard}>
          <View style={styles.assignmentHeader}>
            <Text style={styles.assignmentTitle}>Science Project</Text>
            <Text style={[styles.assignmentStatus, getStatusColor('overdue')]}>Overdue</Text>
          </View>
          <Text style={styles.assignmentDate}>Due Date: 12/05/2024</Text>
          <Pressable onPress={() => toggleDropdown('science')} style={styles.dropdownButton}>
            <Text style={styles.dropdownText}>Show Details</Text>
          </Pressable>
          {showDropdown === 'science' && (
            <View style={styles.dropdown}>
              <Text style={styles.assignmentDescription}>This is a science project focused on environmental studies. It requires research on renewable energy sources.</Text>
              <View style={styles.extraInfo}>
                <Text style={styles.extraInfoText}>Instructions: Research and create a report on solar energy.</Text>
                <Text style={styles.extraInfoText}>Attachment: [Download Project Guidelines]</Text>
                <Text style={styles.extraInfoText}>Link: [Click here for resources]</Text>
              </View>
              <View style={styles.assignmentFooter}>
                <Text style={styles.assignmentCurrency}>+20 Coins</Text>
                <Text style={styles.assignmentExp}>+0.2 EXP</Text>
              </View>
            </View>
          )}
        </View>
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
  assignmentCard: {
    backgroundColor: '#1c1c1c',
    margin: 10,
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: 'relative',
  },
  assignmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  assignmentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  assignmentStatus: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffffff',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 9999,
  },
  overdueStatus: {
    backgroundColor: '#e74c3c',
  },
  completedStatus: {
    backgroundColor: '#2ecc71',
  },
  upcomingStatus: {
    backgroundColor: '#3498db',
  },
  assignmentDate: {
    color: '#737373',
    marginTop: 5,
  },
  assignmentFooter: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginTop: 15,
  },
  assignmentCurrency: {
    color: '#ffd700',
    fontWeight: 'bold',
  },
  assignmentExp: {
    color: '#7e22ce',
    fontWeight: 'bold',
    marginTop: 5,
  },
  dropdownButton: {
    marginTop: 10,
    padding: 8,
    backgroundColor: '#333333',
    borderRadius: 5,
    alignItems: 'center',
  },
  dropdownText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  dropdown: {
    marginTop: 10,
    backgroundColor: '#2a2a2a',
    padding: 20,
    borderRadius: 5,
  },
  assignmentDescription: {
    color: '#ffffff',
    marginBottom: 15,
  },
  extraInfo: {
    marginTop: 10,
  },
  extraInfoText: {
    color: '#ffffff',
    marginTop: 5,
  },
});