import { Button, Flex, Heading } from '@chakra-ui/react';

interface PageTitleProps {
  title: string;
}
function PageTitle({ title }: PageTitleProps) {
  return (
    <>
      <Flex justify={'space-between'} gap={6} w={'full'} align={'center'}>
        <Heading as={'h1'} size={'xl'}>
          {title}
        </Heading>
        {/* <Button colorScheme="cyan">Adicionar</Button> */}
      </Flex>
    </>
  );
}

export default PageTitle;
