import React from 'react';
import {
  Flex,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@sipher.dev/sipher-ui';

interface CustomPopoverProps {
  icon?: React.ReactElement;
  children?: React.ReactNode;
  label: string;
}

export const CustomPopover = ({ icon, children, label = '' }: CustomPopoverProps) => {
  return (
    <Popover placement="bottom-start">
      <PopoverTrigger>{icon}</PopoverTrigger>
      <PopoverContent
        _focus={{ boxShadow: 'none', border: 'none' }}
        rounded="lg"
        border="none"
        bg="accent.50"
        color="white"
        p={4}
      >
        <Flex justify="space-between" align="center" pos="relative">
          <Text fontWeight={600} color="neutral.900" textTransform="uppercase">
            {label}
          </Text>
          <PopoverCloseButton pos="unset" bg="none" color="neutral.400" />
        </Flex>
        <PopoverBody p={0} mt={4}>
          {children}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
