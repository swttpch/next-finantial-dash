'use client';

import { MobileNav } from '@/components/MobileNav';
import { SidebarContent } from '@/components/Sidebar';
import { LINK_ITEMS } from '@/constants/sidemenu.constants';
import {
  useDisclosure,
  Box,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Flex,
} from '@chakra-ui/react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'flex' }}
        items={LINK_ITEMS}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} items={LINK_ITEMS} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
      <Flex ml={{ base: 0, md: 60 }} p="4" gap={8} direction={'column'}>
        {children}
      </Flex>
    </Box>
  );
}
