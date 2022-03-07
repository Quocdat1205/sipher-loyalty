import React from 'react';
import { BsFillTriangleFill } from 'react-icons/bs';
import { Box, Flex, FlexProps, Input, Select, Text } from '@sipher.dev/sipher-ui';

import { SpTime } from './icons/SpTime';

export type TimePickerValueType = {
  hour: number | null;
  min: number | null;
  amOrPm: AmOrPmType;
};

type AmOrPmType = 'am' | 'pm';

type DataType = keyof TimePickerValueType;

interface Props extends Omit<FlexProps, 'onChange'> {
  value: TimePickerValueType;
  onChange: (value: TimePickerValueType) => void;
  onFocus?: () => void;
}

const AmValue: AmOrPmType = 'am';
const PmValue: AmOrPmType = 'pm';

export const TimePicker = ({ value: timePickerValue, onChange, onFocus, ...flexProps }: Props) => {
  const paddingZero = (number: number) => {
    if (typeof number === 'number' && number.toString().length === 1) {
      return `0${number}`;
    }

    return String(number);
  };

  const handleChangeTimePickerValue = (value: string | number, type: DataType) => {
    if (type === 'min' || type === 'hour') {
      onChange({
        ...timePickerValue,
        [type]: Number(value),
      });
    } else if (type === 'amOrPm') {
      onChange({
        ...timePickerValue,
        amOrPm: value as AmOrPmType,
      });
    }
  };

  const handleInput = (inputValue: string, type: DataType) => {
    if (type === 'hour') {
      const userInput = Number(inputValue);
      const MAX_HOUR = 12;
      const time = Math.abs(userInput > MAX_HOUR ? userInput % MAX_HOUR : userInput);
      handleChangeTimePickerValue(time, 'hour');
    } else if (type === 'min') {
      const userInput = Number(inputValue);
      const MAX_MINUTE = 59;
      const time = Math.abs(userInput > MAX_MINUTE ? userInput % MAX_MINUTE : userInput);
      handleChangeTimePickerValue(time, 'min');
    } else if (type === 'amOrPm') {
      const userInput = inputValue || AmValue;
      handleChangeTimePickerValue(userInput, 'amOrPm');
    }
  };

  return (
    <Flex
      flex={1}
      h="40px"
      bg="neutral.600"
      justify="space-between"
      borderRadius="4px"
      align="center"
      {...flexProps}
    >
      <Flex px={4} align="center">
        <Box mr={2} color="neutral.400">
          <SpTime />
        </Box>
        <Input
          textAlign="center"
          variant="unstyled"
          w="24px"
          paddingX="unset"
          type="number"
          value={paddingZero(timePickerValue.hour as number)}
          onChange={e => handleInput(e.target.value, 'hour')}
          placeholder="00"
          onFocus={onFocus}
        />
        <Text color={timePickerValue.hour ? 'white' : 'neutral.400'}>:</Text>
        <Input
          textAlign="center"
          variant="unstyled"
          w="24px"
          paddingX="unset"
          type="number"
          value={paddingZero(timePickerValue.min as number)}
          onChange={e => handleInput(e.target.value, 'min')}
          placeholder="00"
          onFocus={onFocus}
        />
      </Flex>
      <Select
        border="unset"
        _focus={{ boxShadow: 'none' }}
        w="5rem"
        icon={
          <Box
            w="auto!important"
            h="auto!important"
            color="#7c7d91!important"
            transform={'auto'}
            rotate="180deg"
          >
            <BsFillTriangleFill size={'0.5rem'} />
          </Box>
        }
        borderTopLeftRadius="unset"
        borderBottomLeftRadius="unset"
        defaultValue={timePickerValue.amOrPm}
        onChange={e => handleInput(e.target.value, 'amOrPm')}
        onFocus={onFocus}
      >
        <option value={AmValue}>AM</option>
        <option value={PmValue}>PM</option>
      </Select>
    </Flex>
  );
};
