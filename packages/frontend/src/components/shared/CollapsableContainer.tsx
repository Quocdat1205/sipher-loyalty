import { ReactNode, useState } from 'react';
import { BsFillTriangleFill } from 'react-icons/bs';
import { MdInfo } from 'react-icons/md';
import { Box, BoxProps, Collapse, Flex, Text, Tooltip } from '@sipher.dev/sipher-ui';

interface CollapsableContainerProps extends Omit<BoxProps, 'children' | 'title'> {
  title: string;
  labelTooltip?: string;
  children: ReactNode;
}

export const CollapsableContainer = ({
  labelTooltip,
  title,
  children,
  ...rest
}: CollapsableContainerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box bg="background.secondary" {...rest}>
      <Flex
        justify="space-between"
        align="center"
        p={4}
        cursor="pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Flex align="center">
          <Text textTransform="uppercase" fontWeight={600} userSelect="none">
            {title}
          </Text>
          {labelTooltip && (
            <Tooltip
              label={labelTooltip}
              hasArrow
              placement="bottom-start"
              fontSize="sm"
              bg="#383838DD"
              fontWeight={400}
              rounded="lg"
              p={2}
              w="240px"
            >
              <Box ml={2} color="text.secondary">
                <MdInfo size="1.2rem" />
              </Box>
            </Tooltip>
          )}
        </Flex>
        <Box color="text.secondary" transform="auto" rotate={!isOpen ? '180deg' : '0deg'} px={4}>
          <BsFillTriangleFill size="0.5rem" />
        </Box>
      </Flex>
      <Collapse in={isOpen}>
        <Box p={4} pt={0}>
          {children}
        </Box>
      </Collapse>
    </Box>
  );
};
