import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import {
  ROUTE_PATH_BASE,
  ROUTE_PATH_FIXED_SAVING,
  ROUTE_PATH_GOAL_LIST,
  ROUTE_PATH_LOGIN,
} from '../store/routerStore';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../asset/images/logo_main_light.png';
import moas from '../asset/images/logo_name.png';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useState } from 'react';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: -1,
      left: -1,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

const Header = ({ handleOpenModal }) => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const isLogin = useSelector((state) => state.isLogin);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <AppBar
      position="fixed"
      sx={(theme) => ({
        height: '60px',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.white,
        borderBottom: `4px solid ${theme.colors.mainHeavy}`,
      })}
    >
      <Toolbar sx={{ maxWidth: 600, minWidth: 360 }}>
        <IconButton size="large" edge="start" onClick={handleOpenModal}>
          <MenuIcon />
        </IconButton>

        <Link to={ROUTE_PATH_BASE}>
          <IconButton size="large">
            <img src={logo} alt="logo" style={{ height: '48px' }} />
            <img src={moas} alt="logo" style={{ height: '48px' }} />
          </IconButton>
        </Link>
        {isLogin.userInfo.id === -1 ? (
          <>
            {/* 비로그인시 */}
            <Typography variant="h2" sx={{ mr: 4 }}>
              <Link to={ROUTE_PATH_LOGIN} style={{ textDecoration: 'none' }}>
                로그인
              </Link>
            </Typography>
            <Typography variant="h2" sx={{ mr: 4 }}>
              <Link
                to={ROUTE_PATH_FIXED_SAVING}
                style={{ textDecoration: 'none' }}
              >
                적금
              </Link>
            </Typography>
          </>
        ) : (
          <>
            {/* 로그인 시 */}
            <Typography variant="h2" sx={{ mr: 4 }}>
              <Link
                to={ROUTE_PATH_GOAL_LIST}
                style={{ textDecoration: 'none' }}
              >
                희망목록
              </Link>
            </Typography>
            <Typography variant="h2" sx={{ mr: 4 }}>
              <Link
                to={ROUTE_PATH_FIXED_SAVING}
                style={{ textDecoration: 'none' }}
              >
                적금추천
              </Link>
            </Typography>
            <Box>
              <Tooltip title={isLogin.userInfo.name}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                  >
                    <Avatar
                      src={isLogin.userInfo.picture}
                      alt={isLogin.userInfo.name}
                    />
                  </StyledBadge>
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
                <MenuItem onClick={handleCloseUserMenu}>회원정보</MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>정보수정</MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>로그아웃</MenuItem>
              </Menu>
            </Box>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  handleOpenModal: PropTypes.func,
};

export default Header;