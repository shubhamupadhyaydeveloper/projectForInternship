import React from 'react'
import {useMutation , useQueryClient} from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { Button } from '@chakra-ui/react'

const DeleteUser = ({userId}) => {

  const navigate  = useNavigate()
  const queryClient = useQueryClient()
  const {isPending,mutate} = useMutation({
    mutationFn : async function () {
       try {
         const request = await fetch(`/api/users/${userId}`,{
          method : 'DELETE'
         })
         const response  = await request.json()
         navigate('/')
         return response
       } catch (error) {
         console.log('Error in deleteUser',error.message)
       }
    },
    onSuccess : () => {
      queryClient.invalidateQueries({queryKey : ['allusers']})
    }
  })

  return (
    <div>
      <Button onClick={() => mutate()} disabled={isPending}>
         Delete
      </Button>
    </div>
  )
}

export default DeleteUser;
