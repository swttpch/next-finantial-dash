'use client';

import React from 'react';
import {
  Box,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
  Flex,
} from '@chakra-ui/react';
import { SidebarContent } from '@/components/Sidebar';
import { MobileNav } from '@/components/MobileNav';
import { LINK_ITEMS } from '@/constants/sidemenu.constants';

interface DefaultLayoutProps {
  children: React.ReactNode;
}

export default function DefaultLayout({ children }: DefaultLayoutProps) {
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
