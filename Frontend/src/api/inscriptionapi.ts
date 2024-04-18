import { InscriptionResponse, Inscription, InscriptionEntry }  from '../types';
import axios from 'axios';

export const getInscriptions = async (): Promise<InscriptionResponse[]> => {
        const token = sessionStorage.getItem("jwt");
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/inscriptions`,{
    headers: { 'Authorization' : token }
    });
  return response.data._embedded.inscriptions;
}

export const deleteInscription = async (link: string): Promise<InscriptionResponse> => {
  const token = sessionStorage.getItem("jwt");
  const response = await axios.delete(link, { headers: { 'Authorization': token } });
  return response.data
}

export const addInscription = async (Inscription: Inscription): Promise<InscriptionResponse> => {
  const token = sessionStorage.getItem("jwt");
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/inscriptions`, Inscription, {
    headers: { 'Content-Type': 'application/json', 'Authorization': token},
  });

  return response.data;
}

export const updateInscription = async (inscriptionEntry: InscriptionEntry): Promise<InscriptionResponse> => {
  const token = sessionStorage.getItem("jwt");
  const response = await axios.put(inscriptionEntry.url, inscriptionEntry.inscription, {
    headers: {
    'Content-Type': 'application/json', 'Authorization': token
    },
  });

  return response.data;
}