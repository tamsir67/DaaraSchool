import { EtudiantResponse, Etudiant, EtudiantEntry }  from '../types';
import axios from 'axios';

export const getEtudiants = async (): Promise<EtudiantResponse[]> => {
  const token = sessionStorage.getItem("jwt");
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/etudiants`,{
    headers: { 'Authorization' : token }
    });
  return response.data._embedded.etudiants;
}

export const deleteEtudiant = async (link: string): Promise<EtudiantResponse> => {
  const token = sessionStorage.getItem("jwt");
  const response = await axios.delete(link, { headers: { 'Authorization': token } });
  return response.data
}

export const addEtudiant = async (Etudiant: Etudiant): Promise<EtudiantResponse> => {
  const token = sessionStorage.getItem("jwt");
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/etudiants`, Etudiant, {
    headers: { 'Content-Type': 'application/json', 'Authorization': token},
  });

  return response.data;
}

export const updateEtudiant = async (etudiantEntry: EtudiantEntry): Promise<EtudiantResponse> => {
  const token = sessionStorage.getItem("jwt");
  const response = await axios.put(etudiantEntry.url, etudiantEntry.etudiant, {
    headers: {
    'Content-Type': 'application/json', 'Authorization': token},
  });


  return response.data;
}