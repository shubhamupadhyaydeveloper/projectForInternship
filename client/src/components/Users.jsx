import React from 'react'
import User from './User';
import { Flex, Heading, Text } from '@chakra-ui/react';

const Users = ({userData}) => {

  if(userData.length === 0) {
    return <Flex  mt={10} mb={5} alignItems={"centre"} justifyContent={'center'}>
          <Text fontSize={'xl'} fontWeight={'semibold'}>User not Found</Text>
    </Flex>
  }

  return (
    <div>
       <Heading as="h1" size="md" textAlign="center" mt={8} mb={4}>
        All users
      </Heading>
        <Flex
          flexWrap="wrap"
          justify="center"
          align="flex-start"
          px={4}
          maxW={{ base: '100%', md: '80%', lg: '60%' }}
          mx="auto"
          gap={10}
        >
        {userData?.map((user) => (
             <User key={user?._id} userDetail={user}/>
        ))}
        </Flex>
    </div>
  )
}

export default Users;
