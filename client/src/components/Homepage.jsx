import React from 'react'
import Users from './Users';
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { useState } from 'react';
import { Button, Flex, Spinner, Text } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { setUsers } from '../../store/reducer';
import Filters from './Filters';

const Homepage = () => {
    const [page, setPage] = useState(1);
    const users = useSelector(state => state.user.users)
    const filterUser = useSelector(state => state.user.filterdUsers)
    const dispatch = useDispatch()

    const fetchProjects = async (page) => {
        try {
            const request = await fetch(`/api/users?page=${page}`);
            const response = await request.json()
            dispatch(setUsers(response))
            return response
        } catch (error) {
            console.log('Error in getApi', error.message)
        }
    };

    const { isLoading } = useQuery({
        queryKey: ['allusers', { page }],
        queryFn: () => fetchProjects(page),
        placeholderData: keepPreviousData
    })

    if (!users) {
        return <Text fontSize={'xl'}>Users not Found</Text>
    }

    if (isLoading) {
        return (
            <Flex alignItems="center" justifyContent="center" mt={5}>
                <Spinner size={'xl'} />
            </Flex>
        )
    }

    return (
        <div>
             <Filters />
            <Users userData={ filterUser ?? users?.users} />
            <Flex alignItems="center" justifyContent="center" gap={5} mt={5} mb={10}>
            <Button
                onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
                isDisabled={page === 1}
            >
                Previous Page
            </Button>
            <span>Current Page: {users?.currentPage}</span>
            <Button
                onClick={() => setPage((prevPage) => prevPage + 1)}
                isDisabled={page >= users?.totalPages}
            >
                Next Page
            </Button>
            </Flex>
        </div>
    )
}

export default Homepage;
