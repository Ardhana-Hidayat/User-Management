import { UserInterface } from '@/interface';
import axios from 'axios';

const API_URL = 'http://localhost:5000'; 

export const getUsers = async (): Promise<UserInterface[]> => {
    try {
        const response = await axios.get(`${API_URL}/users`);
        if (Array.isArray(response.data)) {
            return response.data;
        } else {
            throw new Error('Invalid data format');
        }
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

export const getUserById = async (id: number): Promise<UserInterface> => {
    try {
      const response = await axios.get(`${API_URL}/users/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching user with id ${id}:`, error);
      throw error;
    }
  };

export const postUser = async (formData: FormData) => {
    try {
        const response = await axios.post(`${API_URL}/users`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error posting user:', error);
        throw error;
    }
};

export const editUser = async (formData: FormData, id: number): Promise<UserInterface> => {
    try {
        const response = await axios.put(`${API_URL}/users/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};

export const deleteAllUsers = async () => {
    try {
        const response = await axios.delete(`${API_URL}/users`);
        return response.data;
    } catch (error) {
        console.error('Error deleting all users:', error);
        throw error;
    }
};