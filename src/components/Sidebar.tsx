import { LinkItemProps } from '@/types/common.types';
import {
  BoxProps,
  Button,
  CloseButton,
  Flex,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { NavItem } from './NavItem';
import { IoExitOutline } from 'react-icons/io5';
import { logout } from '@/helpers/logout';

interface SidebarProps extends BoxProps {
  onClose: () => void;
  items: Array<LinkItemProps>;
}

export const SidebarContent = ({ onClose, items, ...rest }: SidebarProps) => {
  return (
    <Flex
      direction="column"
      gap={2}
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Stack spacing={2} flex={1}>
        <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
          <Text fontSize="xl" fontWeight="bold">
            Finantial App
          </Text>
          <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
        </Flex>
        {items.map((link) => (
          <NavItem href={link.href} key={link.name} icon={link.icon}>
            {link.name}
          </NavItem>
        ))}
      </Stack>
      <Flex as="form" action={async () => logout()} p={8} direction={'column'}>
        <Button type="submit" colorScheme="red" alignSelf={'stretch'} rightIcon={<IoExitOutline />}>
          Logout
        </Button>
      </Flex>
    </Flex>
  );
};
