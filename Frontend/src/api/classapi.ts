import { ClasseResponse, Classe, ClasseEntry }  from '../types';
import axios from 'axios';

export const getClasses = async (): Promise<ClasseResponse[]> => {
  const token = sessionStorage.getItem("jwt");
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/classes`,{
    headers: { 'Authorization' : token }
    });
  return response.data._embedded.classes;
}

export const deleteClasse = async (link: string): Promise<ClasseResponse> => {
  const token = sessionStorage.getItem("jwt");
  const response = await axios.delete(link, { headers: { 'Authorization': token } });
  return response.data
}

export const addClasse = async (Classe: Classe): Promise<ClasseResponse> => {
  const token = sessionStorage.getItem("jwt");
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/classes`, Classe, {
    headers: { 'Content-Type': 'application/json', 'Authorization': token},
  });

  return response.data;
}

export const updateClasse = async (classeEntry: ClasseEntry): Promise<ClasseResponse> => {
  const token = sessionStorage.getItem("jwt");
  const response = await axios.put(classeEntry.url, classeEntry.classe, {
    headers: {
    'Content-Type': 'application/json','Authorization': token
    },
  });

  return response.data;
}