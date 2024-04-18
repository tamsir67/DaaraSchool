import { ProfesseurResponse, Professeur, ProfesseurEntry }  from '../types';
import axios from 'axios';

export const getProfesseurs = async (): Promise<ProfesseurResponse[]> => {
  const token = sessionStorage.getItem("jwt");
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/professeurs`,{
    headers: { 'Authorization' : token }
    });
  return response.data._embedded.professeurs;
}

export const deleteProfesseur = async (link: string): Promise<ProfesseurResponse> => {
  const token = sessionStorage.getItem("jwt");
  const response = await axios.delete(link, { headers: { 'Authorization': token } });
  return response.data
}

export const addProfesseur = async (Professeur: Professeur): Promise<ProfesseurResponse> => {
  const token = sessionStorage.getItem("jwt");
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/professeurs`, Professeur, {
    headers: { 'Content-Type': 'application/json', 'Authorization': token},
  });

  return response.data;
}

export const updateProfesseur = async (professeurEntry: ProfesseurEntry): Promise<ProfesseurResponse> => {
  const token = sessionStorage.getItem("jwt");
  const response = await axios.put(professeurEntry.url, professeurEntry.professeur, {
    headers: {
    'Content-Type': 'application/json','Authorization': token
    },
  });

  return response.data;
}