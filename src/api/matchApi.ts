// src/api/matchApi.ts 😎🔥

import api from './axios';

// 🏏 Get All Matches
export const getMatches = async () => {
  const response = await api.get('/matches');

  return response.data;
};

// 🏏 Get Match By ID
export const getMatchById = async (id: string) => {
  const response = await api.get(`/matches/${id}`);

  return response.data;
};

// 🏏 Create Match
export const createMatch = async (matchData: any) => {
  const response = await api.post('/matches', matchData);

  return response.data;
};

// 🏏 Toss Match
export const tossMatch = async (matchId: string, tossData: any) => {
  const response = await api.put(`/matches/${matchId}/toss`, tossData);

  return response.data;
};

// 🏏 Add Ball
export const addBall = async (
  matchId: string,
  inningsNumber: number,
  ballData: any,
) => {
  const response = await api.post(
    `/matches/${matchId}/score/${inningsNumber}`,
    ballData,
  );

  return response.data;
};

// 🏏 Update Match
export const updateMatch = async (id: string, matchData: any) => {
  const response = await api.put(`/matches/${id}`, matchData);

  return response.data;
};

// 🏏 Delete Match
export const deleteMatch = async (id: string) => {
  const response = await api.delete(`/matches/${id}`);

  return response.data;
};
