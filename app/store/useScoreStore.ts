import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';

interface ScoreStore {
  score: number;
  lifetimeScore: number;
  increment: () => Promise<void>;
  reset: () => Promise<void>;
  load: () => Promise<void>;
}

export const useScoreStore = create<ScoreStore>((set, get) => ({
  score: 0,
  lifetimeScore: 0,

  load: async () => {
    const savedScore = await SecureStore.getItemAsync('score');
    const savedLifetime = await SecureStore.getItemAsync('lifetimeScore');
    set({
      score: savedScore ? parseInt(savedScore) : 0,
      lifetimeScore: savedLifetime ? parseInt(savedLifetime) : 0,
    });
  },

  increment: async () => {
    const newScore = get().score + 1;
    const newLifetime = get().lifetimeScore + 1;
    set({ score: newScore, lifetimeScore: newLifetime });
    await SecureStore.setItemAsync('score', newScore.toString());
    await SecureStore.setItemAsync('lifetimeScore', newLifetime.toString());
  },

  reset: async () => {
    set({ score: 0, lifetimeScore: 0 });
    await SecureStore.setItemAsync('score', '0');
    await SecureStore.setItemAsync('lifetimeScore', '0');
  },
}));