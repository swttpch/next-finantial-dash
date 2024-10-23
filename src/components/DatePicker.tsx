'use client';

import React, { forwardRef, useState } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

// CSS Modules, react-datepicker-cssmodules.css
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import {
  Box,
  Button,
  Flex,
  Input,
  Radio,
  RadioGroup,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

export const DatePickerInput = () => {
  const [startDate, setStartDate] = useState<string>();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const setDate = (date: Date | null) => {
    if (!date) return;
    setStartDate(date.toISOString().split('T')[0]);
  };

  return (
    <Flex direction={'column'} align={'center'} gap={2}>
      <Input display={'none'} name="period" value={startDate} />
      <Button variant={'outline'} onClick={onOpen} w={'100%'} rightIcon={<ChevronDownIcon />}>
        {startDate === '7' || startDate === '15' || startDate === '30'
          ? `Last ${startDate} days`
          : startDate
          ? new Date(startDate).toLocaleDateString('en-US', {
              month: '2-digit',
              day: '2-digit',
              year: 'numeric',
            })
          : 'Select a date'}
      </Button>
      {isOpen && (
        <Box
          position={'fixed'}
          w={'100vw'}
          height={'100vh'}
          top={0}
          left={0}
          onClick={onClose}
        ></Box>
      )}
      {isOpen && (
        <>
          <Flex
            p={2}
            gap={2}
            rounded={'xs'}
            border={'1px'}
            borderColor={'gray.200'}
            direction={'column'}
          >
            <DatePicker
              inline
              selected={
                startDate === '7' || startDate === '15' || startDate === '30'
                  ? null
                  : (startDate && new Date(startDate)) || null
              }
              onChange={(date) => {
                setDate(date);
                onClose();
              }}
              customInput={<></>}
            />
            <RadioGroup
              value={
                startDate === '7' || startDate === '15' || startDate === '30'
                  ? startDate
                  : undefined
              }
              onChange={(e) => {
                setStartDate(e);
                onClose();
              }}
            >
              <Stack>
                <Radio value="7">Last 7 days</Radio>
                <Radio value="15">Last 15 days</Radio>
                <Radio value="30">Last 30 days</Radio>
              </Stack>
            </RadioGroup>
          </Flex>
        </>
      )}
    </Flex>
  );
};
