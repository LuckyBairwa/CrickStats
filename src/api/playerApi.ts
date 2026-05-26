// src/api/playerApi.ts 😎🔥

import api from './axios';

// 🏏 Get All Players
export const getPlayers = async () => {
  const response = await api.get('/players');

  return response.data;
};

// 🏏 Get Single Player
export const getPlayerById = async (id: string) => {
  const response = await api.get(`/players/${id}`);

  return response.data;
};

// 🏏 Create Player
export const createPlayer = async (playerData: any) => {
  const response = await api.post('/players', playerData);

  return response.data;
};

// 🏏 Update Player
export const updatePlayer = async (id: string, playerData: any) => {
  const response = await api.put(`/players/update-player/${id}`, playerData);

  return response.data;
};

// 🏏 Delete Player
export const deletePlayer = async (id: string) => {
  const response = await api.delete(`/players/${id}`);

  return response.data;
};
