import {  Flex, Heading } from '@chakra-ui/react';

interface PageTitleProps {
  title: string;
  children?: React.ReactNode;
}
function PageTitle({ title, children }: PageTitleProps) {
  return (
    <>
      <Flex justify={'space-between'} gap={6} w={'full'} align={'center'}>
        <Heading as={'h1'} size={'xl'}>
          {title}
        </Heading>
        {children}
      </Flex>
    </>
  );
}

export default PageTitle;
