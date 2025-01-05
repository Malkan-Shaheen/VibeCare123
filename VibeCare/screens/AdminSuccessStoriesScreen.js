import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AdminSuccessStoriesScreen = () => {
  // Dummy static stories
  const stories = [
    {
      _id: '1',
      title: 'Success Story One',
      subtitle: 'Location A',
      story: 'This is a dummy success story used for display only.',
    },
    {
      _id: '2',
      title: 'Success Story Two',
      subtitle: 'Location B',
      story: 'Here is another placeholder story for UI preview.',
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>Success Stories Management</Text>

        {stories.map((story) => (
          <View key={story._id} style={styles.storyCard}>
            <View style={styles.headerRow}>
              <Text style={styles.name}>{story.title}</Text>
              <TouchableOpacity>
                <Ionicons name="trash-outline" size={24} color="#B00020" />
              </TouchableOpacity>
            </View>
            <Text style={styles.location}>📍 {story.subtitle}</Text>
            <Text style={styles.storyText}>{story.story}</Text>
          </View>
        ))}

        {stories.length === 0 && (
          <Text style={styles.emptyText}>No success stories to display.</Text>
        )}
      </ScrollView>
    </View>
  );
};

// ===== Styles =====
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDE9E6',
    padding: 16,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#610d1b',
    marginVertical: 20,
    textAlign: 'center',
    marginTop: 50,
  },
  storyCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#37474F',
  },
  location: {
    color: '#607D8B',
    marginTop: 4,
    marginBottom: 10,
    fontSize: 14,
  },
  storyText: {
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
    textAlign: 'justify',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#999',
  },
});

export default AdminSuccessStoriesScreen;
