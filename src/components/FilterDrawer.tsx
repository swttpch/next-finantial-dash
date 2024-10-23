'use client';

import {
  useDisclosure,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Input,
  DrawerFooter,
  Code,
  FormControl,
  FormLabel,
  Box,
} from '@chakra-ui/react';
import React from 'react';
import { IoFilterCircleOutline } from 'react-icons/io5';
import { Select } from 'chakra-react-select';

interface FilterDrawerProps {
  states: { value: string; label: string }[];
  accounts: { value: string; label: string }[];
  industries: { value: string; label: string }[];
}

function FilterDrawer({ states, accounts, industries }: FilterDrawerProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef<HTMLButtonElement | null>(null);
  return (
    <>
      <Button
        ref={btnRef}
        variant={'outline'}
        onClick={onOpen}
        leftIcon={<IoFilterCircleOutline />}
      >
        Filter
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef}>
        <Box as="form">
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Define the filters</DrawerHeader>

            <DrawerBody>
              <FormControl p={4}>
                <FormLabel>States</FormLabel>
                <Select
                  isMulti
                  name="states"
                  options={states}
                  placeholder="Select some states"
                  closeMenuOnSelect={false}
                  size="sm"
                />
              </FormControl>
              <FormControl p={4}>
                <FormLabel>Accounts</FormLabel>
                <Select
                  isMulti
                  name="accounts"
                  options={accounts}
                  placeholder="Select some accounts"
                  closeMenuOnSelect={false}
                  size="sm"
                />
              </FormControl>
              <FormControl p={4}>
                <FormLabel>Industries</FormLabel>
                <Select
                  isMulti
                  name="industries"
                  options={industries}
                  placeholder="Select some industries"
                  closeMenuOnSelect={false}
                  size="sm"
                />
              </FormControl>
            </DrawerBody>

            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="blue" type="submit">
                Save
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Box>
      </Drawer>
    </>
  );
}

export default FilterDrawer;
