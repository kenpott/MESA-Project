import React from 'react';
import { View, Text, Pressable, StyleSheet, Linking } from 'react-native';

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

interface AssignmentCardProps {
  assignment: Assignment;
  showDropdown: number | null;
  toggleDropdown: (assignmentId: number) => void;
}

export default function AssignmentCard({
  assignment,
  showDropdown,
  toggleDropdown,
}: AssignmentCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'overdue':
        return styles.overdueStatus;
      case 'completed':
        return styles.completedStatus;
      case 'upcoming':
        return styles.upcomingStatus;
      default:
        return styles.defaultStatus;
    }
  };

  const openLink = (url: string) => {
    Linking.openURL(url).catch((err) => console.error("Failed to open URL:", err));
  };

  return (
    <View style={styles.assignmentCard}>
      <View style={styles.assignmentHeader}>
        <Text style={styles.assignmentTitle}>{assignment.title}</Text>
        <Text style={[styles.assignmentStatus, getStatusColor(assignment.status)]}>
          {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
        </Text>
      </View>
      {/* Display the class under the title */}
      <Text style={styles.assignmentClassText}>{assignment.class}</Text>
      <Text style={styles.assignmentDate}>Due: {assignment.dueDate}</Text>
      <Pressable onPress={() => toggleDropdown(assignment.id)} style={styles.dropdownButton}>
        <Text style={styles.dropdownText}>
          {showDropdown === assignment.id ? 'Hide Details' : 'Show Details'}
        </Text>
      </Pressable>
      {showDropdown === assignment.id && (
        <View style={styles.dropdown}>
          <View style={styles.assignmentTypeContainer}>
            <Text style={styles.assignmentType}>{assignment.type}</Text>
          </View>

          {/* Description Section */}
          <Text style={styles.sectionHeader}>Description:</Text>
          <Text style={styles.assignmentDescription}>{assignment.description}</Text>

          {/* Links Section */}
          {assignment.links && assignment.links.length > 0 && (
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionHeader}>Links:</Text>
              {assignment.links.map((link, index) => (
                <Text key={index} style={styles.linkText}>
                  <Text style={{ color: '#7e22ce' }} onPress={() => openLink(link)}>
                    [Click here for resources]
                  </Text>
                </Text>
              ))}
            </View>
          )}

          {/* Attachments Section */}
          {assignment.files && assignment.files.length > 0 && (
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionHeader}>Attachments:</Text>
              {assignment.files.map((file, index) => (
                <Text key={index} style={styles.fileText}>
                  [Download {file}]
                </Text>
              ))}
            </View>
          )}

          {/* Coins and Exp Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeader}>Rewards:</Text>
            <Text style={styles.rewardText}>+{assignment.coins} Coins</Text>
            <Text style={styles.rewardText}>+{assignment.exp} Exp</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  assignmentCard: {
    backgroundColor: '#1c1c1c',
    margin: 10,
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 10,
    elevation: 5,
  },
  assignmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  assignmentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    flex: 1,
    marginRight: 10,
  },
  assignmentStatus: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  overdueStatus: {
    color: '#dc2626',
  },
  completedStatus: {
    color: '#22c55e',
  },
  upcomingStatus: {
    color: '#Afeeee',
  },
  defaultStatus: {
    color: '#a1a1a1',
  },
  assignmentDate: {
    fontSize: 14,
    color: '#737373',
    marginTop: 5,
  },
  assignmentClassText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#737373',
    marginTop: 5,
  },
  dropdownButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#7e22ce',
    borderRadius: 5,
  },
  dropdownText: {
    fontSize: 14,
    color: '#ffffff',
    textAlign: 'center',
  },
  dropdown: {
    marginTop: 10,
    backgroundColor: '#2d2d2d',
    padding: 10,
    borderRadius: 5,
  },
  assignmentTypeContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#4b4b4b',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  assignmentType: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  assignmentDescription: {
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 10,
  },
  sectionContainer: {
    marginTop: 10,
  },
  fileText: {
    fontSize: 14,
    color: '#60a5fa',
  },
  linkText: {
    fontSize: 14,
    color: '#60a5fa',
  },
  rewardText: {
    fontSize: 14,
    color: '#22c55e',
    marginTop: 5,
  },
});
