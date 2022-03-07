import React from 'react';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { chakra, Flex, HStack, IconButton, Text } from '@chakra-ui/react';

import { DOTS, usePagination } from '@hooks';

const Pagination = props => {
  const { onPageChange, totalCount, siblingCount = 1, currentPage, pageSize } = props;

  const paginationRange =
    usePagination({
      currentPage,
      totalCount,
      siblingCount,
      pageSize,
    }) || [];

  if (currentPage === 0 || paginationRange!.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange[paginationRange.length - 1];

  return (
    <HStack spacing={1} alignItems="center">
      <IconButton
        size="sm"
        boxSize="32px"
        onClick={onPrevious}
        aria-label="left"
        isDisabled={currentPage === 1}
        icon={<BiChevronLeft size="1.5em" />}
        variant="ghost"
        _hover={{ bg: 'accent.500', color: 'neutral.900' }}
      >
        Left
      </IconButton>
      {paginationRange.map(pageNumber => {
        if (pageNumber === DOTS) {
          return <chakra.li className="pagination-item dots">&#8230;</chakra.li>;
        }

        return (
          <Flex
            align="center"
            justify="center"
            rounded="full"
            boxSize="32px"
            cursor="pointer"
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            bg={
              pageNumber === currentPage
                ? 'linear-gradient(to bottom, #FF6795, #FF710B 84.37%)'
                : 'rgba(255,255,255,0.1)'
            }
          >
            <Text fontSize="xs">{pageNumber}</Text>
          </Flex>
        );
      })}
      <IconButton
        size="sm"
        boxSize="32px"
        onClick={onNext}
        aria-label="right"
        isDisabled={currentPage === lastPage}
        icon={<BiChevronRight size="1.5em" />}
        variant="ghost"
        _hover={{ bg: 'accent.500', color: 'neutral.900' }}
      >
        Right
      </IconButton>
    </HStack>
  );
};

export default Pagination;
