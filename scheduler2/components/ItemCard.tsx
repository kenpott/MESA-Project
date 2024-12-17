import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Pressable, ScrollView, Image } from 'react-native';
import ItemCard from './ItemCard'; // Importing ItemCard component

export default function Shop() {
  const [activeTab, setActiveTab] = useState<string>('all');
  const currency = 150; // Example currency amount

  const handleBuy = (itemName: string) => {
    console.log(`Bought ${itemName}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {/* Currency Display */}
        <View style={styles.currencyContainer}>
          <Image
            source={require('../../assets/coin.png')} // Currency image (replace with actual path)
            style={styles.currencyIcon}
          />
          <Text style={styles.currencyText}>{currency}</Text>
        </View>

        <Text style={styles.title}>Shop</Text>
        <Text style={styles.subtitle}>Browse and purchase your items</Text>
      </View>

      {/* Category Tabs */}
      <View style={styles.tabsContainer}>
        {['all', 'weapons', 'armor', 'items'].map((tab) => (
          <Pressable
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={[
              styles.tabButton,
              activeTab === tab ? styles.activeTab : styles.inactiveTab,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab ? styles.activeTabText : styles.inactiveTabText,
              ]}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Item List */}
      <ScrollView style={styles.itemList}>
        {/* Example Item Cards */}
        <ItemCard
          image={require('../../assets/item1.png')} // Replace with your item image
          name="Item 1"
          description="This is a description of Item 1."
          price="$10"
          onBuy={() => handleBuy('Item 1')}
        />

        <ItemCard
          image={require('../../assets/item2.png')} // Replace with your item image
          name="Item 2"
          description="This is a description of Item 2."
          price="$20"
          onBuy={() => handleBuy('Item 2')}
        />

        <ItemCard
          image={require('../../assets/item3.png')} // Replace with your item image
          name="Item 3"
          description="This is a description of Item 3."
          price="$30"
          onBuy={() => handleBuy('Item 3')}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111', // Dark background color
    paddingVertical: 24,
  },
  header: {
    padding: 20,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  currencyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 10,
  },
  currencyIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  currencyText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#7e22ce', // Purple for currency
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff', // White text for the title
  },
  subtitle: {
    fontSize: 18,
    color: '#737373', // Light gray text for subtitle
    marginTop: 5,
    marginBottom: 20, // Adjusted bottom margin for spacing
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    marginBottom: 20, // Added spacing between tabs and item list
  },
  tabButton: {
    padding: 12,
    borderRadius: 10,
    textAlign: 'center',
  },
  activeTab: {
    backgroundColor: '#7e22ce', // Purple for active tab
  },
  inactiveTab: {
    backgroundColor: '#1f1f1f', // Dark background for inactive tabs
  },
  tabText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  activeTabText: {
    color: '#ffffff',
  },
  inactiveTabText: {
    color: '#737373',
  },
  itemList: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
});
