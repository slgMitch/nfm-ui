import * as React from 'react';
import { 
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Button,
  Badge
} from '@mui/material'
import AdbIcon from '@mui/icons-material/Adb';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSnipcart } from 'use-snipcart';
import Link from 'next/link';
import { useRouter } from 'next/router';


const pages = [
    { name: 'Apparel', href: '/apparel' }, 
    { name: 'Accessories', href: '/accessories' }, 
    { name: 'Prints', href: '/prints' }, 
    { name: 'Projects', href: '/projects' },
];

export default function ResponsiveAppBar() {
  const { cart = {} } = useSnipcart();
  const { push } = useRouter();

  const openShoppingCart = () => {
    Snipcart.api.theme.cart.open()
  }

  const navigateToMyProfile = () => {
    push('/profile')
  }

  const navigateToPage = (href) => {
    push(href)
  }

  return (
    <AppBar sx={{ borderRadius: '16px'}} position="sticky" >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href='/'
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                textDecoration: 'none',
                cursor: 'pointer',
                color: 'white'
              }}
            >
              NFM
            </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
                <Button
                  key={page.name}
                  onClick={() => navigateToPage(page.href)}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page.name}
                  </Button>
            ))}
          </Box>
          <Box>
            <Button
              key="profile"
              onClick={navigateToMyProfile}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              My Profile
            </Button>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton 
              size="large"
              color="inherit"
              onClick={openShoppingCart} 
              sx={{ 
                p: 0,
                padding: '15px'
              }}
            >
              <Badge badgeContent={cart.items?.count} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}