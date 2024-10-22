import { LinkItemProps } from '@/types/common.types';
import { Box, BoxProps, CloseButton, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import { NavItem } from './NavItem';

interface SidebarProps extends BoxProps {
  onClose: () => void;
  items: Array<LinkItemProps>;
}

export const SidebarContent = ({ onClose, items, ...rest }: SidebarProps) => {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="xl" fontFamily="monospace" fontWeight="bold">
          Finantial App
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {items.map((link) => (
        <NavItem key={link.name} icon={link.icon}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};
