import {
    Heading,
    Avatar,
    Box,
    Center,
    Text,
    Stack,
    Badge,
    useColorModeValue,
  } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
  
  export default function User({ userDetail }) {
    return (
        <Link to={`/${userDetail?._id}`} >
      <Center py={6}>
        <Box
          maxW={'300px'}
          w={'350px'}
          bg={useColorModeValue('white', 'gray.900')}
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
            <Avatar size={'xl'} src={`${userDetail?.avatar}`} mb={4} pos={'relative'} />
            <Heading fontSize={'2xl'} fontFamily={'body'}>
              {userDetail?.firstname} {userDetail?.lastname}
            </Heading>
            <Text fontWeight={600} color={'gray.500'} mb={4}>
              {userDetail?.email}
            </Text>
          </Box>
  
          <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
            <Box maxW="50%">
              <Badge
                px={2}
                py={1}
                bg={useColorModeValue('gray.50', 'gray.800')}
                fontWeight={'400'}
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
              >
                {userDetail?.gender}
              </Badge>
            </Box>
            <Box maxW="50%">
              <Badge
                px={2}
                py={1}
                bg={useColorModeValue('gray.50', 'gray.800')}
                fontWeight={'400'}
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
              >
                {userDetail?.domain}
              </Badge>
            </Box>
            <Box maxW="50%">
              <Badge
                px={2}
                py={1}
                bg={useColorModeValue('gray.50', 'gray.800')}
                fontWeight={'400'}
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
              >
                available: {userDetail?.available ? 'True' : 'False'}
              </Badge>
            </Box>
          </Stack>
        </Box>
      </Center>
        </Link>
    );
  }
  