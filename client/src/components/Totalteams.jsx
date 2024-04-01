import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Box, Flex, Spinner, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const Totalteams = () => {

    // api
    const { data, isLoading } = useQuery({
        queryKey: ['allteams'],
        queryFn: async function () {
            try {
                const request = await fetch(`/api/team`, {
                    method: 'GET'
                })
                const response = await request.json()
                return response
            } catch (error) {
                console.log('Error in getTeams', error.message)
            }
        }
    })

    if (isLoading) {
        return (
            <Flex alignItems="center" justifyContent="center" mt={5}>
                <Spinner size={'xl'} />
            </Flex>
        )
    }

    return (
        <div>

            <Flex gap={5} flexDirection={"column"} alignItems={"center"} justifyContent={"center"} mt={5} >
                {data?.map(team => (
                    <Link key={team?._id} to={`/teamdetail/${team?._id}`}>
                        <Box p={4} bg={"white"} width={"300px"} color={"black"} rounded={"md"}>
                            <Text>Total members : {team?.members?.length} </Text>
                            {team?.members?.map(member => (
                                <Flex key={member?._id} mt={2}>
                                    <Text>{member?.firstname + member?.lastname}</Text>
                                </Flex>
                            ))}
                        </Box>
                    </Link>
                ))}
            </Flex>

        </div>
    )
}

export default Totalteams;
