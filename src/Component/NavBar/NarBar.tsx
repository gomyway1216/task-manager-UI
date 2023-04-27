import React, { FC, useState } from 'react';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { useAuth } from '../../Provider/AuthProvider';
import { useNavigate } from 'react-router-dom';
import styles from './NavBar.module.scss';
import SearchBar from '../SearchBar/SerchBar';

const pages = [
  {
    title: 'Task',
    link: '/task'
  },
  {
    title: 'Add Task',
    link: '/task-add'
  },
];

const ResponsiveAppBar: FC = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const { userId, signOut } = useAuth();
  const navigate = useNavigate();
  // Add a state to manage the visibility of the search TextField
  const [searchVisible, setSearchVisible] = useState(false);

  // Toggle the visibility state of the TextField when the search icon is clicked
  const handleToggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleNavMenuClick = (link: string) => {
    setAnchorElNav(null);
    navigate(link);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box className={styles.root}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        // paddingTop: (theme) => theme.mixins.toolbar.minHeight,
      }}
    >
      <Box>
        <AppBar className={styles.navBar}
          position="static"
        >
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem key={page.title} onClick={() => handleNavMenuClick(page.link)}>
                      <Typography textAlign="center">{page.title}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <Typography
                variant="h5"
                noWrap
                component="a"
                href="/"
                sx={{
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                Task Manager
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {pages.map((page) => (
                  <Button
                    key={page.title}
                    onClick={() => handleNavMenuClick(page.link)}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {page.title}
                  </Button>
                ))}
              </Box>
              {!userId &&
                <Button variant="outlined"
                  className={styles.loginButton}
                  onClick={() => navigate('/signin')}>LOGIN</Button>
              }
              {userId &&
                <>
                  <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                      size="large"
                      onClick={handleToggleSearch}
                      sx={{
                        color: 'white',
                      }}
                    >
                      <SearchIcon />
                    </IconButton>
                  </Box>
                  <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    <SearchBar
                      color='white'
                      characterColor='white'
                      searchIconRequired
                      callback={() => setSearchVisible(false)}
                    />
                  </Box>
                  <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      sx={{ mt: '45px' }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      <MenuItem key='Profile'>
                        <Typography textAlign="center">Profile</Typography>
                      </MenuItem>
                      <MenuItem key='LogOut' onClick={() => signOut()}>
                        <Typography textAlign="center">Log out</Typography>
                      </MenuItem>
                    </Menu>
                  </Box>
                </>}
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
      {/* Conditionally render the TextField below the AppBar based on the state */}
      {searchVisible && (
        <Box
          sx={{
            borderBottom: 1,
            borderColor: 'blue',
            flexGrow: 1,
            display: { xs: 'flex', md: 'none' }
          }}
        >
          <SearchBar
            color='white'
            characterColor='black'
            callback={() => setSearchVisible(false)}
          />
        </Box>
      )}
    </Box>
  );
}
export default ResponsiveAppBar;
