import { ReactNode } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbProps,
  Text,
} from '@sipher.dev/sipher-ui';

interface ChakraBreadcrumbProps extends BreadcrumbProps {
  pathData: { href: string; children: ReactNode }[];
  currentPath?: string;
}

export const ChakraBreadcrumb = ({ pathData, currentPath, ...rest }: ChakraBreadcrumbProps) => {
  return (
    <Breadcrumb
      sx={{
        '.chakra-breadcrumb__list': {
          display: 'flex',
          alignItems: 'center',
        },
      }}
      separator={
        <Text color="text.secondary" fontSize={'sm'}>
          /
        </Text>
      }
      {...rest}
    >
      {pathData.map((path, idx) => (
        <BreadcrumbItem key={path.href} isCurrentPage={path.href === currentPath}>
          <BreadcrumbLink
            href={path.href}
            _focus={{ boxShadow: 'none' }}
            _hover={{ fontStyle: 'none' }}
            color={idx === 0 ? 'text.primary' : 'text.secondary'}
            fontWeight={500}
            letterSpacing={'0.5px'}
          >
            {path.children}
          </BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
};
