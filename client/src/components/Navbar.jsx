import {
    Box,
    Flex,
    HStack,
    IconButton,
    useDisclosure,
    useColorModeValue,
    Stack,
    Input,
    InputGroup,
    InputRightElement,
    Text,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom'
import { LuSearch } from "react-icons/lu";
import { useState } from 'react';
import {useQuery} from '@tanstack/react-query'
import { useSelector, useDispatch } from 'react-redux';
import { setUsers } from '../../store/reducer';

export default function Navbar() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [input , setInput] = useState('')
    const dispatch = useDispatch()
    const users = useSelector(state => state.user.users)

    // api
    const {} = useQuery({
        queryKey : ['search',input],
        queryFn : async function() {
            try {
                const request = await fetch(`/api/users?q=${input}`)
                const response = await request.json()
                dispatch(setUsers(response))
                return response
            } catch (error) {
                console.log('Error in searchInput',error.message)
            }
        }
    })
    
    return (
        <>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <IconButton
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack spacing={8} alignItems={'center'}>
                        <Text visibility={['hidden','visible']}><Link to='/'>Home</Link></Text>
                        <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
                            <Link to='/newuser'>CreateUser</Link>
                            <Link to='/newteam'>CreateTeam</Link>
                            <Link to='/teams'>Allteams</Link>
                        </HStack>
                    </HStack>
                    <Flex alignItems={'center'}>
                        <InputGroup>
                            <Input type='text'
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                placeholder='firstname or lastname' />
                            <InputRightElement >
                                <LuSearch size={"1.4rem"} />
                            </InputRightElement>
                        </InputGroup>
                    </Flex>
                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{ md: 'none' }}>
                        <Stack as={'nav'} spacing={4}>
                            <Link to='/'>Home</Link>
                            <Link to='/newuser'>Create User</Link>
                            <Link to='/newteam'>CreateTeam</Link>
                            <Link to='/teams'>Allteams</Link>
                        </Stack>
                    </Box>
                ) : null}
            </Box>
        </>
    )
}