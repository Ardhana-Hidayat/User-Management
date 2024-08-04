'use client'

import { useEffect, useState } from 'react';
import ButtonAdd from "@/components/organism/ButtonAdd";
import ButtonDeleteAll from "@/components/organism/ButtonDeleteAll";
import TableUser from "@/components/organism/TableUser";
import { deleteAllUsers, getUsers } from "@/lib/api";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

interface UsersProps { }

const Users: React.FC<UsersProps> = () => {

    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersData = await getUsers();
                
                setLoading(false);
                setUsers(usersData);

            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                <CircularProgress className='text-blue-500' />
            </Box>
        );
    }

    const deleteAll = async () => {
        try {
            await deleteAllUsers();
            console.log('Users deleted successfully!');

            const usersData = await getUsers();
            setUsers(usersData);
        } catch (error) {
            console.error('Error deleting users:', error);
        }
    };

    return (
        <div>
            <div className="flex flex-row justify-between mb-5">
                <div className="text-xl font-semibold">
                    Data User
                </div>
                <div className="flex gap-5">
                    <ButtonDeleteAll onUsersDeleted={deleteAll} />
                    <ButtonAdd />
                </div>
            </div>

            <div>
                <TableUser users={users} />
            </div>
        </div>
    );
};

export default Users;
