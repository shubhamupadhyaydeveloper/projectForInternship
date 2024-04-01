import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Text,
    Select,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import {useMutation,useQueryClient,useQuery} from '@tanstack/react-query'
import useShowToast from './ShowToast'
import {useNavigate,useParams} from 'react-router-dom'


export default function Edituser() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { userId } = useParams();
    const showToast = useShowToast()
    const { register, handleSubmit, formState: {  errors }, reset } = useForm()

    //get user data
    const { data } = useQuery({
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

    // api call
    const {isPending,mutateAsync} = useMutation({
        mutationKey : ['createuser'],
        mutationFn : async function (data) {
            try {
                const request = await fetch(`/api/users/${userId}`, {
                    method : 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                })
    
                const response = await request.json()
                console.log(response)
                showToast('User created successful','success')
                navigate(`/${userId}`)
                return response
            } catch (error) {
                console.log('Error in createUse',error.message)
            }
        },
        onSuccess :  () => {
            queryClient.invalidateQueries({queryKey : ['userDetail']})
        }
    })

    const handleFromSubmit = async (data) => {
        const userData = {
            firstname : data.firstname,
            lastname : data.lastname,
            email : data.email,
            domain : data.domain,
            available : data.available
        }

        try {
           const request = await mutateAsync(userData)
        } catch (error) {
            console.log("Error in sendUserdata",error.message)
        }

    }
    return (
        <Stack mx={'auto'} maxW={'lg'} py={12} px={6}
        >
            <Box
                rounded={'lg'}
               
                p={8}>
                <Stack spacing={4}>
                    <form onSubmit={handleSubmit(handleFromSubmit)} >
                        <Flex
                            gap={3}
                            flexDirection={["column", "column", "row", "row", "row"]}
                        >
                            <Box>
                                <FormControl id="firstName" >
                                    <FormLabel color={"white"}>FirstName</FormLabel>
                                    <Input type="text"
                                        defaultValue={data?.firstname}
                                        {...register("firstname", { required: "firstname is required" })}
                                    />
                                    {errors.text && <Text color={"red"} fontWeight="semibold" fontSize="sm">{errors.text.message}</Text>}
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl id="lastName" >
                                    <FormLabel color={"white"}>LastName</FormLabel>
                                    <Input type="text"
                                        defaultValue={data?.lastname}
                                        {...register("lastname", { required: "Lastname is reqired" })}
                                    />
                                </FormControl>
                            </Box>
                        </Flex>
                        <FormControl id="email"  mt={3}>
                            <FormLabel color={"white"}>Email address</FormLabel>
                            <Input type="email"
                                defaultValue={data?.email}
                                {...register("email", { required: "Email is required" })}
                            />
                        </FormControl>


                        <FormControl id="domain"  mt={3}>
                            <FormLabel color={"white"}>Domain</FormLabel>
                            <Input type="text"
                                defaultValue={data?.domain}
                                {...register("domain", { required: "domain is required" })}
                            />
                        </FormControl>


                        <FormControl id="available"  mt={3}>
                            <FormLabel color={"white"}>Availbale</FormLabel>
                            <Select placeholder='Select option' {...register('available')} defaultValue={data?.available}>
                                <option value='true'>true</option>
                                <option value='false'>false</option>
                            </Select>
                        </FormControl>

                        <Stack spacing={10} pt={2} mt={3}>
                            <Button
                                loadingText="Submitting"
                                disabled={isPending}
                                size="lg"
                                bg={'blue.400'}
                                type='submit'
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}>
                                Update User
                            </Button>
                        </Stack>
                    </form>

                </Stack>
            </Box>
        </Stack>

    )
}