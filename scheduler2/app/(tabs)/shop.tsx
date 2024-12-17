import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Pressable, ScrollView, Image } from 'react-native';

export default function Shop() {
  const [activeTab, setActiveTab] = useState<string>('all');
  const currency = 150; // Example currency amount

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {/* Currency Display */}
        <View style={styles.currencyContainer}>
          <Image
            source={require('../../assets/images/cat.jpg')} // Currency image (replace with actual path)
            style={styles.currencyIcon}
          />
          <Text style={styles.currencyText}>{currency}</Text>
        </View>

        <Text style={styles.title}>Shop</Text>
      </View>

      {/* Category Tabs */}
      <View style={styles.tabsContainer}>
        {['All', 'Background', 'Border', 'Cosmetics'].map((tab) => (
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
        {/* Example Item Card */}
        <View style={styles.itemCard}>
          <Image
            source={require('../../assets/images/cat.jpg')} // Replace with your item image
            style={styles.itemImage}
          />
          <Text style={styles.itemName}>Item 1</Text>
          <Text style={styles.itemDescription}>This is a description of Item 1.</Text>
          <Text style={styles.itemPrice}>$10</Text>
          <Pressable style={styles.purchaseButton}>
            <Text style={styles.purchaseButtonText}>Buy Now</Text>
          </Pressable>
        </View>

        <View style={styles.itemCard}>
          <Image
            source={require('../../assets/images/cat.jpg')} // Replace with your item image
            style={styles.itemImage}
          />
          <Text style={styles.itemName}>Item 2</Text>
          <Text style={styles.itemDescription}>This is a description of Item 2.</Text>
          <Text style={styles.itemPrice}>$20</Text>
          <Pressable style={styles.purchaseButton}>
            <Text style={styles.purchaseButtonText}>Buy Now</Text>
          </Pressable>
        </View>

        <View style={styles.itemCard}>
          <Image
            source={require('../../assets/images/cat.jpg')} // Replace with your item image
            style={styles.itemImage}
          />
          <Text style={styles.itemName}>Item 3</Text>
          <Text style={styles.itemDescription}>This is a description of Item 3.</Text>
          <Text style={styles.itemPrice}>$30</Text>
          <Pressable style={styles.purchaseButton}>
            <Text style={styles.purchaseButtonText}>Buy Now</Text>
          </Pressable>
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
    color: '#7e22ce',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  tabsContainer: {
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
    marginBottom: 20,
  },
  tabButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    backgroundColor: '#7e22ce',
  },
  inactiveTab: {
    backgroundColor: '#1f1f1f',
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
  itemCard: {
    backgroundColor: '#1f1f1f',
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    alignItems: 'center',
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 12,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  itemDescription: {
    fontSize: 14,
    color: '#737373',
    textAlign: 'center',
    marginVertical: 8,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#7e22ce',
    marginBottom: 12,
  },
  purchaseButton: {
    backgroundColor: '#7e22ce',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  purchaseButtonText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
  },
});


