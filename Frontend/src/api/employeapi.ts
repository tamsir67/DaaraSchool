import { EmployeResponse, Employe, EmployeEntry }  from '../types';
import axios from 'axios';

export const getEmployes = async (link: string): Promise<EmployeResponse> => {
  const token = sessionStorage.getItem("jwt");
  const response = await axios.delete(link, { headers: { 'Authorization': token } });
  return response.data
}
export const deleteEmploye = async (link: string): Promise<EmployeResponse> => {
  const token = sessionStorage.getItem("jwt");
  const response = await axios.delete(link, { headers: { 'Authorization': token }});
  return response.data
}

export const addEmploye = async (Employe: Employe): Promise<EmployeResponse> => {
  const token = sessionStorage.getItem("jwt");
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/employes`, Employe, {
    headers: { 'Content-Type': 'application/json', 'Authorization': token}},
  );

  return response.data;
}

export const updateEmploye = async (employeEntry: EmployeEntry): Promise<EmployeResponse> => {
  const token = sessionStorage.getItem("jwt");
  const response = await axios.put(employeEntry.url, employeEntry.employe, {
    headers: {
    'Content-Type': 'application/json', 'Authorization': token
    },
  });

  return response.data;
}