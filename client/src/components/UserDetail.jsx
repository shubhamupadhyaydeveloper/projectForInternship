import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Avatar, Badge, Box, Center, Heading, Stack, Text, Flex, Spinner, useColorModeValue, Button } from '@chakra-ui/react';
import DeleteUser from './DeleteUser';

const UserDetail = () => {
    const { userId } = useParams();

    const { data, isLoading } = useQuery({
        queryKey: ['userDetail', userId],
        queryFn: async function () {
            try {
                const request = await fetch(`/api/users/${userId}`, {
                    method: 'GET'
                });
                const response = await request.json();
                return response;
            } catch (error) {
                console.log('Error in userDetail', error.message);
            }
        }
    });

    // Move color mode values outside of the component
    const bgColor = useColorModeValue('white', 'gray.900');
    const textColor = useColorModeValue('gray.500', 'gray.400');

    if (isLoading) {
        return (
            <Flex alignItems="center" justifyContent="center" mt={5}>
                <Spinner size={'xl'} />
            </Flex>
        );
    }

    return (
        <div>
            <Center py={6}>
                <Box
                    maxW={'300px'}
                    w={'350px'}
                    bg={bgColor}
                    shadow={'xl'}
                    rounded={'lg'}
                    p={6}
                    textAlign={'center'}
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                    alignItems="center"
                    height="100%"
                >
                    <Box>
                        <Avatar size={'xl'} src={`${data?.avatar}`} mb={4} pos={'relative'} />
                        <Heading fontSize={'2xl'} fontFamily={'body'}>
                            {data?.firstname} {data?.lastname}
                        </Heading>
                        <Text fontWeight={600} color={textColor} mb={4}>
                            {data?.email}
                        </Text>
                    </Box>

                    <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
                        <Box maxW="50%">
                            <Badge
                                px={2}
                                py={1}
                                bg={bgColor}
                                color={textColor}
                                fontWeight={'400'}
                                overflow="hidden"
                                textOverflow="ellipsis"
                                whiteSpace="nowrap"
                            >
                                {data?.gender}
                            </Badge>
                        </Box>
                        <Box maxW="50%">
                            <Badge
                                px={2}
                                py={1}
                                bg={bgColor}
                                color={textColor}
                                fontWeight={'400'}
                                overflow="hidden"
                                textOverflow="ellipsis"
                                whiteSpace="nowrap"
                            >
                                {data?.domain}
                            </Badge>
                        </Box>
                        <Box maxW="50%">
                            <Badge
                                px={2}
                                py={1}
                                bg={bgColor}
                                color={textColor}
                                fontWeight={'400'}
                                overflow="hidden"
                                textOverflow="ellipsis"
                                whiteSpace="nowrap"
                            >
                                available: {data?.available ? 'True' : 'False'}
                            </Badge>
                        </Box>
                    </Stack>

                    <Flex gap={5}>
                        <Button><Link to={`/edit/${userId}`}>Edit</Link></Button>
                         <DeleteUser userId={userId} />
                    </Flex>
                </Box>
            </Center>
        </div>
    );
};

export default UserDetail;
