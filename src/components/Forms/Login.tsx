'use client';
import { authenticate } from '@/app/lib/actions';
import {
  Box,
  useColorModeValue,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
  Heading,
  Text,
} from '@chakra-ui/react';
import { BsExclamationCircle } from 'react-icons/bs';
import { useActionState } from 'react';
import { useSearchParams } from 'next/navigation';

function LoginForm() {
  const searchParams = useSearchParams();
  const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined);
  const onSubmit = async (e: FormData) => {
    e.append('redirectTo', searchParams.get('callbackUrl') || '/dashboard');
    formAction(e);
  };
  return (
    <>
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}
      >
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          </Stack>
          <Box
            as="form"
            action={onSubmit}
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input type="text" name={'email'} />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" name="password" />
              </FormControl>
              <Stack spacing={10}>
                <Button
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  type="submit"
                  aria-disabled={isPending}
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
            {errorMessage && (
              <Flex gap={2} align={'center'} w={'full'} justify={'center'} p={4}>
                <BsExclamationCircle color="red" />
                <Text color={'red.500'}>{errorMessage}</Text>
              </Flex>
            )}
          </Box>
        </Stack>
      </Flex>
    </>
  );
}

export default LoginForm;
