import React, { useState } from 'react';
import { View, ScrollView, Text, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Tab() {
  const [activeTab, setActiveTab] = useState<'friends' | 'school'>('friends');
  const [hoveredTab, setHoveredTab] = useState<'friends' | 'school' | null>(null);
  const [activeCategory, setActiveCategory] = useState<'level' | 'assignments'>('level');
  const [hoveredCategory, setHoveredCategory] = useState<'level' | 'assignments' | null>(null);

  const circularButtons = Array(7).fill({ name: 'Username', number: '0000' });
  const tabs: Array<'friends' | 'school'> = ['friends', 'school'];
  const categories: Array<'level' | 'assignments'> = ['level', 'assignments'];

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View>
        <Text style={styles.title}>Leaderboards</Text>

        {/* Category Tabs */}
        <View style={styles.center}>
          <View style={styles.tabContainer}>
            {tabs.map((tab, index) => (
              <Pressable
                key={tab}
                onPress={() => setActiveTab(tab)}
                onPressIn={() => setHoveredTab(tab)}
                onPressOut={() => setHoveredTab(null)}
                style={[
                  styles.tab,
                  index < 1 && styles.marginRight,
                  activeTab === tab ? styles.activeTab : hoveredTab === tab ? styles.hoveredTab : styles.inactiveTab,
                ]}
              >
                <Text style={[styles.tabText, activeTab === tab ? styles.activeText : styles.inactiveText]}>
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Leaderboard Type Categories */}
        <View style={styles.categoryContainer}>
          {categories.map((category) => (
            <Pressable
              key={category}
              onPress={() => setActiveCategory(category)}
              onPressIn={() => setHoveredCategory(category)}
              onPressOut={() => setHoveredCategory(null)}
              style={[
                styles.category,
                activeCategory === category ? styles.activeTab : hoveredCategory === category ? styles.hoveredTab : styles.inactiveTab,
              ]}
            >
              <Text style={[styles.categoryText, activeCategory === category ? styles.activeText : styles.inactiveText]}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Top Rank Display */}
        <View style={styles.rankContainer}>
          <View style={styles.rankRow}>
            <Text style={styles.rankText}>#1</Text>
            <Text style={styles.usernameText}>Username</Text>
            <Text style={styles.scoreText}>0000</Text>
          </View>
        </View>

        {/* Top 3 Ranks */}
        <View style={styles.topThreeContainer}>
          {['#2', '#1', '#3'].map((rank, index) => (
            <View key={rank} style={styles.topThreeItem}>
              <View style={styles.avatar}></View>
              <Text style={styles.nameText}>Name</Text>
              <Text style={styles.nameText}>999</Text>
              <View
                style={[
                  styles.rankBadge,
                  index === 0 ? styles.secondPlace : index === 1 ? styles.firstPlace : styles.thirdPlace,
                ]}
              >
                <Text style={styles.rankBadgeText}>{rank}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Scrollable Leaderboard List */}
      <ScrollView>
        <View style={styles.rankContainer}>
          {circularButtons.map((button, index) => (
            <View key={index} style={styles.rankRow}>
              <Text style={styles.rankText}>#{index + 4}</Text>
              <Text style={styles.usernameText}>{button.name}</Text>
              <Text style={styles.scoreText}>{button.number}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#111111',
  },
  title: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  center: {
    marginVertical: 8,
    alignItems: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#1c1c1c',
    borderRadius: 9999,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 9999,
    textAlign: 'center',
  },
  marginRight: {
    marginRight: 8,
  },
  activeTab: {
    backgroundColor: '#7e22ce',
  },
  hoveredTab: {
    backgroundColor: '#1c1c1c',
  },
  inactiveTab: {
    backgroundColor: '#1c1c1c',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
  },
  activeText: {
    color: '#ffffff',
  },
  inactiveText: {
    color: '#737373',
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 8,
    paddingHorizontal: 10,
  },
  category: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 9999,
    textAlign: 'center',
    marginRight: 8,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  rankContainer: {
    backgroundColor: '#1c1c1c',
    margin: 16,
    padding: 8,
    borderRadius: 24,
  },
  rankRow: {
    padding: 8,
    marginVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 16,
  },
  rankText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  usernameText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#737373',
    flex: 1,
    marginLeft: 16,
  },
  scoreText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#737373',
  },
  topThreeContainer: {
    backgroundColor: '#1c1c1c',
    borderRadius: 24,
    flexDirection: 'row',
    margin: 16,
    justifyContent: 'space-between',
  },
  topThreeItem: {
    width: '30%',
    padding: 20,
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: '#ffffff',
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  nameText: {
    color: '#ffffff',
    fontWeight: 'bold',
    paddingTop: 8,
  },
  rankBadge: {
    borderRadius: 9999,
    padding: 4,
    marginTop: 4,
  },
  firstPlace: {
    backgroundColor: '#f6e05e',
  },
  secondPlace: {
    backgroundColor: '#a0aec0',
  },
  thirdPlace: {
    backgroundColor: '#dd6b20',
  },
  rankBadgeText: {
    color: '#ffffff',
    paddingHorizontal: 16,
    fontWeight: 'bold',
  },
});
