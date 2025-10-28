import { Text } from '@/components/Themed';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import React, { useEffect } from 'react';
import { useScoreStore } from '../store/useScoreStore';
import { Pressable, StyleSheet, View } from 'react-native';


export default function TabTwoScreen() {
const { lifetimeScore, reset, load } = useScoreStore();

  useEffect(() => {
      load();
    }, []);

    return(

      <LinearGradient
              colors={['#f4a261', '#7c6015ff']}
              style={styles.container}>

          <View style={{ position: 'absolute', top: 1, right: 10 }}>
            <Link href="/" asChild>
                <Pressable style={styles.statsButton}>
                  <Text style={styles.statsButtonText}>Cookie Clicker</Text>
                </Pressable>
              </Link>
          </View>

          <View style={{ position: 'absolute', right: 10, bottom: 10 }}>
            <Pressable style={styles.statsButton} onPress={reset}>
              <Text style={styles.statsButtonText}>Reset Stats</Text>
            </Pressable>
          </View>
 
        <Text style={styles.statsText}>Lifetime Cookies: {lifetimeScore}</Text>

      </LinearGradient>

    );
}
const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },

  statsText: {
    fontSize: 22,
    color: '#ffffffff',
  },
  statsButton: {
    backgroundColor: '#db9d6aff', 
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20, 
    marginTop: 20, 
    alignItems: 'center', 

  },

  statsButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    
  }
});
