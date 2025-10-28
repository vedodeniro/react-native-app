import { useAudioPlayer } from 'expo-audio';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import cookieImage from '../../assets/images/image.png';
const audioSource = require('../../assets/Boom.mp3');
import React, { useEffect } from 'react';
import { useScoreStore } from '../store/useScoreStore';


export default function TabOneScreen() {
  const { score, increment, load } = useScoreStore();
  const player = useAudioPlayer(audioSource);


  useEffect(() => {
    load();
  }, []);

  return (
      <LinearGradient
        colors={['#f4a261', '#7c6015ff']}
        style={styles.container}>
      <Text style={styles.title}>Cookie Clicker</Text>

    <View style={{ position: 'absolute', top: 1, right: 10 }}>
      <Link href="/stats" asChild>
        <Pressable style={styles.statsButton}>
          <Text style={styles.statsButtonText}>Stats</Text>
        </Pressable>
      </Link>
    </View>

      <TouchableOpacity
        onPress={async() =>{

          await increment();
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
          player.seekTo(0);
          player.play();
          }}
        >

        <Image source={cookieImage} style={styles.cookieImage} />
        <Text style={styles.cookieText}></Text>
      </TouchableOpacity>

      <Text style={styles.scoreText}>Cookies: {score}</Text>
      </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ffffffff'
  },
  cookieText: {
    fontSize: 10,
    color: '#ffffffff'
  },
  scoreText: {
    marginTop: 20,
    fontSize: 20,
    color: '#ffffffff'
  },
  cookieImage: {
    width: 350,
    height: 350,
    margin: 10,
    borderRadius: 175,
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
})
