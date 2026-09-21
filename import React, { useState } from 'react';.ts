import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
// --- MOCK DATA --
const CATEGORIES = ['Career', 'Finance', 'Health', 'Relationships', 'Spirituality'];
const MENTORS = [
  { id: '1', name: 'Alex Rivera', expertise: 'Career & Tech', bio: 'Senior Dev with 10 years exp.' },
  { id: '2', name: 'Sarah Chen', expertise: 'Personal Finance', bio: 'Helping people reach financial 
freedom.' },
];
// --- COMPONENTS --
// Mentee View: Searching for Mentors
const MenteeDashboard = () => (
  <View style={styles.container}>
    <Text style={styles.header}>Find a Mentor</Text>
    <FlatList
      data={MENTORS}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.subtitle}>{item.expertise}</Text>
          <Text style={styles.body}>{item.bio}</Text>
          <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>Request 
Mentorship</Text></TouchableOpacity>
        </View>
      )}
    />
  </View>
);
// Mentor View: Managing Requests
const MentorDashboard = () => (
  <View style={styles.container}>
    <Text style={styles.header}>Mentor Portal</Text>
    <View style={styles.card}>
      <Text style={styles.title}>Pending Requests (3)</Text>
      <Text style={styles.body}>• Jordan P. - Career Guidance</Text>
      <Text style={styles.body}>• Maria L. - Soft Skills</Text>
      <TouchableOpacity style={[styles.button, {backgroundColor: '#2ecc71'}]}>
        <Text style={styles.buttonText}>Review Requests</Text>
      </TouchableOpacity>
    </View>
  </View>
);
const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerStyle: { backgroundColor: '#f8f9fa' } }}>
        <Tab.Screen name="Mentees" component={MenteeDashboard} />
        <Tab.Screen name="Mentors" component={MentorDashboard} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#2c3e50' },
  card: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#f1f2f6',
    marginBottom: 15,
    borderLeftWidth: 5,
    borderLeftColor: '#3498db'
  },
  title: { fontSize: 18, fontWeight: 'bold' },
  subtitle: { fontSize: 14, color: '#7f8c8d', marginBottom: 5 },
body: { fontSize: 14, color: '#34495e', marginBottom: 10 },
  button: {
backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center'
  },
  buttonText: { color: '#fff', fontWeight: 'bold' }
});
