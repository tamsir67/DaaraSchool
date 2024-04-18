import { MatiereResponse, Matiere, MatiereEntry }  from '../types';
import axios from 'axios';

export const getMatieres = async (): Promise<MatiereResponse[]> => {
  const token = sessionStorage.getItem("jwt");
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/matieres`,{
    headers: { 'Authorization' : token }
    });
  return response.data._embedded.matieres;
}

export const deleteMatiere = async (link: string): Promise<MatiereResponse> => {
  const token = sessionStorage.getItem("jwt");
  const response = await axios.delete(link, { headers: { 'Authorization': token } });
  return response.data
}

export const addMatiere = async (Matiere: Matiere): Promise<MatiereResponse> => {
  const token = sessionStorage.getItem("jwt");
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/matieres`, Matiere, {
    headers: { 'Content-Type': 'application/json', 'Authorization': token},
  });

  return response.data;
}

export const updateMatiere = async (matiereEntry: MatiereEntry): Promise<MatiereResponse> => {
  const token = sessionStorage.getItem("jwt");
  const response = await axios.put(matiereEntry.url, matiereEntry.matiere, {
    headers: {
    'Content-Type': 'application/json','Authorization': token
    },
  });

  return response.data;
}