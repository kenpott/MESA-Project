import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ 
      tabBarStyle: {
        height: 85,
        backgroundColor: '#111111',
        borderTopColor: 'transparent',
      },
      tabBarLabelStyle: {
        fontWeight: 'bold',
      },
      tabBarActiveTintColor: '#7e22ce',
      tabBarInactiveTintColor: '#737373',
      }}>
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          headerShown: false,
          tabBarIcon: ({ color }) => <MaterialIcons size={24} name="space-dashboard" color={color} />,
        }}
      />
      <Tabs.Screen
        name="shop"
        options={{
          title: 'Shop',
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome5 size={24} name="shopping-cart" color={color} />,
        }}
      />
      <Tabs.Screen
        name="leaderboards"
        options={{
          title: 'Leaderboards',
          headerShown: false,
          tabBarIcon: ({ color }) => <MaterialIcons size={24} name="leaderboard" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ color }) => <Ionicons size={24} name="person-circle" color={color} />,
        }}
      />
    </Tabs>
    );
}