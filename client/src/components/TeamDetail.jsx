import React from 'react'
import {useParams} from 'react-router-dom'
import {useQuery} from '@tanstack/react-query'
import { Box, Flex, Text } from '@chakra-ui/react'

const TeamDetail = () => {
  const {teamId} = useParams()

  // api 
  const  {isLoading,data} = useQuery({
    queryKey : ['teamdetail',teamId],
    queryFn : async function() {
      try {
        const request = await fetch(`/api/team/${teamId}`,{
          method : 'GET'
        })
        const response = await request.json()
        return response
      } catch (error) {
        console.log('Error in teamDetails',error.message)
      }
    }
  })
  return (
    <div>
      <Flex gap={5} flexDirection={"column"} mt={5} alignItems={'center'} justifyContent={"center"}>
      <Text fontSize={"2xl"} fontWeight={'semibold'}  mb={3} mt={3}>Members</Text>
        {data?.members?.map(member =>  (
          <Box key={member?._id} mt={3} p={3} rounded={'md'} bg={"white"} color={"black"} w={"300px"}>
            <Text> Fullname :{member?.firstname + member?.lastname}</Text>
            <Text> Gender :{member?.gender}</Text>
            <Text> Email :{member?.email}</Text>
            <Text> Domain :{member?.domain}</Text>
            <Text> Available :{member?.available ? 'True' : 'false'}</Text>
          </Box>
        )) }
         <Text></Text>
      </Flex>
    </div>
  )
}

export default TeamDetail;
