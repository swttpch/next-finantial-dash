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
  DrawerFooter,
  FormControl,
  FormLabel,
  Box,
} from '@chakra-ui/react';
import React from 'react';
import { IoFilterCircleOutline } from 'react-icons/io5';
import { Select } from 'chakra-react-select';
import { DatePickerInput } from './DatePicker';
import { useFilter } from '@/hooks/useFilter';

interface FilterDrawerProps {
  states: { value: string; label: string }[];
  accounts: { value: string; label: string }[];
  industries: { value: string; label: string }[];
}

function FilterDrawer({ states, accounts, industries }: FilterDrawerProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef<HTMLButtonElement | null>(null);
  const { states: curStates, accounts: curAccounts, industries: curIndustries } = useFilter();
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
                  defaultValue={states.filter((state) => curStates.includes(state.value))}
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
                  defaultValue={accounts.filter((account) => curAccounts.includes(account.value))}
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
                  defaultValue={industries.filter((industry) =>
                    curIndustries.includes(industry.value),
                  )}
                  size="sm"
                />
              </FormControl>
              <FormControl p={4}>
                <FormLabel>Date</FormLabel>
                <DatePickerInput />
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
