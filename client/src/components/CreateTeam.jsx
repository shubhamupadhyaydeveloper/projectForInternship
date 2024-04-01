import { Box, Button, Flex, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import useShowToast from './ShowToast';
import {useMutation,useQueryClient} from '@tanstack/react-query'
import {useNavigate} from 'react-router-dom'

const TeamCreation = () => {
    const [selectedUsers, setSelectedUsers] = useState([]);
    const users = useSelector(state => state.user.users)
    const showToast = useShowToast()
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const addToTeam = (user) => {
        const isDomainUnique = selectedUsers.every((selectedUser) => selectedUser.domain !== user.domain);

        const isAvailable = user.available;

        if (isDomainUnique && isAvailable) {
            showToast('user added','success')
            setSelectedUsers([...selectedUsers, user]);
        } else {
            showToast('User cannot be added to the team. Either domain is not unique or user is not available.', 'error')
        }
    };

    const resetTeam = () => {
        setSelectedUsers([])
    }

    //api for crateTeam
    const {isPending,mutateAsync} = useMutation({
        mutationKey : ['createteam'],
        mutationFn : async function() {
            try {
                const request = await fetch(`/api/team`, {
                    method : 'POST',
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    body: JSON.stringify({members : selectedUsers})
                });
                const response = await request.json()
                navigate('/teams')
                return response
            } catch (error) {
                console.log("Error in createTeam",error.message)
            }
        },
    onSuccess : () => {
        queryClient.invalidateQueries({queryKey : ['allteams']})
    }
    })

    const createTeam = async () => {
        try {
          const request = await mutateAsync()
          showToast('Team created','success')
          resetTeam()
        } catch (error) {
            console.log('Error in createTeam',error.message)
        }
    }



    return (
        <Flex p={4} mt={5} alignItems={'center'} justifyContent={'center'} flexDirection={"column"} gap={10}>
            <ul>
                <Flex gap={4} alignItems={"center"} mb={5}>
                    <Box>Team members : {selectedUsers?.length}</Box>
                    <Button onClick={resetTeam}>reset Team</Button>
                </Flex>
                {users?.users?.map(user => (
                    <Flex key={user?._id} gap={5} mb={5}>
                        <Box>
                            <Text>{user?.firstname} {user?.lastname} - {user?.domain} - {user?.available ? 'Available' : 'Not Available'}</Text>
                        </Box>
                        <Button onClick={() => addToTeam(user)}>Add to Team</Button>
                    </Flex>
                ))}
            </ul>
            <Button onClick={createTeam} mb={5} isLoading={isPending}>Create Team</Button>
        </Flex>
    );
};

export default TeamCreation;
