import { useAudioPlayer } from 'expo-audio';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import cookieImage from '../../assets/images/image.png';
const audioSource = require('../../assets/Boom.mp3');



export default function TabOneScreen() {
  const [score, setScore] = useState(0);
  const player = useAudioPlayer(audioSource);

  useEffect(() => {
    const loadScore = async () => {
      const savedScore = await SecureStore.getItemAsync('score');
      if (savedScore) setScore(parseInt(savedScore));
    };
    loadScore();
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#f4a261', '#7c6015ff']}
        style={styles.container}>
      <Text style={styles.title}>Cookie Clicker</Text>

      <TouchableOpacity
        onPress={async() =>{
          const newScore = score + 1;
            setScore(newScore);
          await SecureStore.setItemAsync('score', newScore.toString());
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
    </View>
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
  }
})
