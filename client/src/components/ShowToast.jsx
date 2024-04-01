import { useToast } from '@chakra-ui/react';

const ShowToast = () => {
  const toast = useToast();
  const useShowToast = (title , status) => {
     toast({
        title : title,
        status : status,
        duration : 2000,
        isClosable : true
     })
  }
  return useShowToast;
}

export default ShowToast;
