import { Box, Flex, FlexProps, Icon } from '@chakra-ui/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactText } from 'react';
import { IconType } from 'react-icons';

interface NavItemProps extends FlexProps {
  icon: IconType;
  href: string;
  children: ReactText;
}
export const NavItem = ({ icon, children, href, ...rest }: NavItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  const styles: FlexProps = isActive
    ? { bg: 'cyan.400', color: 'white', cursor: 'default' }
    : { cursor: 'poiter', _hover: { bg: 'cyan.200', color: 'gray.900' }, color: 'gray.700' };
  return (
    <Box
      as={isActive ? 'li' : Link}
      listStyleType={'none'}
      {...(isActive ? {} : { href })}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
      <Flex align="center" p="4" mx="4" borderRadius="lg" role="group" {...styles} {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            color={'currentColor'}
            _groupHover={isActive ? {} : { color: 'gray.900' }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};
