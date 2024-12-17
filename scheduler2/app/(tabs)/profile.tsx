import React from 'react';
import { View, ScrollView, Text, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function LeaderboardTab() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* Header Section */}
        <View style={styles.header}>
          <Pressable style={styles.headerIcon}>
            <Entypo name="dots-three-horizontal" size={24} color="#fff" />
          </Pressable>
          <View style={styles.headerActions}>
            <Pressable style={styles.actionIcon}>
              <MaterialIcons name="edit" size={24} color="#fff" />
            </Pressable>
            <Pressable style={styles.actionIcon}>
              <MaterialIcons name="group" size={24} color="#fff" />
            </Pressable>
            <Pressable style={styles.actionIcon}>
              <MaterialIcons name="mail" size={24} color="#fff" />
            </Pressable>
          </View>
        </View>

        {/* Profile Section */}
        <View style={styles.profileCard}>
          <View style={styles.profilePic}></View>
          <View style={styles.profileInfo}>
            <Text style={styles.username}>Username</Text>
            <Text style={styles.level}>Lv. 1</Text>
            <View style={styles.progressBar}></View>
            <View style={styles.stats}>
              <View style={styles.statItem}>
                <FontAwesome6 name="coins" size={16} color="#fff" />
                <Text style={styles.statText}>1000</Text>
              </View>
              <View style={styles.statItem}>
                <FontAwesome name="paper-plane" size={16} color="#fff" />
                <Text style={styles.statText}>500</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Description Section */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>
            Engaging user bio, including information on achievements and personal stats. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Text>
        </View>

        {/* Achievements Section */}
        <View style={styles.achievementsSection}>
          <View style={styles.achievementsHeader}>
            <Text style={styles.achievementTitle}>Achievements</Text>
            <Pressable>
              <MaterialIcons name="arrow-forward-ios" size={16} color="#bbb" />
            </Pressable>
          </View>
          <View style={styles.achievementsGrid}>
            {Array(4).fill(null).map((_, index) => (
              <Pressable key={index} style={styles.achievementCard}></Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',  
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  headerIcon: {
    padding: 8,
  },
  headerActions: {
    flexDirection: 'row',
  },
  actionIcon: {
    marginLeft: 16,
  },
  profileCard: {
    flexDirection: 'row',
    backgroundColor: '#1c1c1c',
    borderRadius: 15,
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    alignItems: 'center',
  },
  profilePic: {
    backgroundColor: '#FFF',
    borderRadius: 50,
    width: 80,
    height: 80,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  username: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  level: {
    color: '#A0A0A0',
    fontSize: 14,
  },
  progressBar: {
    backgroundColor: '#444',
    borderRadius: 4,
    height: 5,
    marginVertical: 8,
    width: '100%',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    color: '#A0A0A0',
    fontSize: 14,
    marginLeft: 6,
  },
  descriptionContainer: {
    marginHorizontal: 16,
    marginTop: 12,
  },
  descriptionText: {
    color: '#A0A0A0',
    fontSize: 14,
    fontStyle: 'italic',
  },
  achievementsSection: {
    backgroundColor: '#1c1c1c',
    paddingVertical: 16,
    marginTop: 16,
    borderRadius: 15,
    marginHorizontal: 16,
  },
  achievementsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  achievementTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    marginTop: 12,
  },
  achievementCard: {
    backgroundColor: '#444',
    width: 60,
    height: 60,
    borderRadius: 12,
    marginBottom: 12,
    marginHorizontal: 6,
  },
});
