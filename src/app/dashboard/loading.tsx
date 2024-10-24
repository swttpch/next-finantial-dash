import { Center, Flex, Spinner } from '@chakra-ui/react';

export default function Loading() {
  return (
    <Center flex={1} h={'full'} w={'full'}>
      <Spinner />
    </Center>
  );
}
