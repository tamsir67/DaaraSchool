import { AppUserResponse, AppUser, AppUserEntry }  from '../types';
import axios from 'axios';

export const getUsers = async (): Promise<AppUserResponse[]> => {
  const token = sessionStorage.getItem("jwt");
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/users`,{
    headers: { 'Authorization' : token }
    });
  return response.data._embedded.users;
}

export const deleteUser = async (link: string): Promise<AppUserResponse> => {
  const token = sessionStorage.getItem("jwt");
  const response = await axios.delete(link, { headers: { 'Authorization': token } });
  return response.data
}

export const addUser = async (AppUser: AppUser): Promise<AppUserResponse> => {
  const token = sessionStorage.getItem("jwt");
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/users`, AppUser, {
    headers: { 'Content-Type': 'application/json', 'Authorization': token},
  });

  return response.data;
}

export const updateUser = async (appuserEntry: AppUserEntry): Promise<AppUserResponse> => {
  const token = sessionStorage.getItem("jwt");
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/users`, appuserEntry, {
    headers: { 'Content-Type': 'application/json', 'Authorization': token},
  });

  return response.data;
}