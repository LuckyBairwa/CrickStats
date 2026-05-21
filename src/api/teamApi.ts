// src/api/teamApi.ts 😎🔥

import api from './axios';

export const createTeam = async (data: any) => {
  const response = await api.post('/teams', data);

  return response.data;
};

// 😎 Get Teams
export const getTeams = async () => {
  const response = await api.get('/teams');

  return response.data;
};

// 🏏 Get Single Team
export const getTeamById = async (id: string) => {
  const response = await api.get(`/teams/${id}`);

  return response.data;
};

// 🏏 Update Team
export const updateTeam = async (id: string, teamData: any) => {
  const response = await api.put(`/teams/${id}`, teamData);

  return response.data;
};

// 🏏 Delete Team
export const deleteTeam = async (id: string) => {
  const response = await api.delete(`/teams/${id}`);

  return response.data;
};
