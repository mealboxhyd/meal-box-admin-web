import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import {
  Toolbar,
  List,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Menu,
  MenuItem,
  Drawer as MuiDrawer,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useNavigate, useParams } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import DiningIcon from "@mui/icons-material/Dining";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import GroupIcon from "@mui/icons-material/Group";

const drawerWidth = 240;

const LEFT_NAV_OPTIONS = [
  {
    label: "Home",
    value: "home",
    icon: <HomeIcon style={{ color: "#F5BE00", fontSize: "30px" }} />,
    path: "/",
  },
  {
    label: "Subscriptions",
    value: "subscriptions",
    icon: <TouchAppIcon style={{ color: "#f73378", fontSize: "30px" }} />,
    path: "/subscriptions",
  },
  {
    label: "Orders",
    value: "orders",
    icon: <LocalMallIcon style={{ color: "#00e676", fontSize: "30px" }} />,
    path: "/orders",
  },
  {
    label: "Meals",
    value: "meals",
    icon: <LunchDiningIcon style={{ color: "#ff5722", fontSize: "30px" }} />,
    path: "/meals",
  },
  {
    label: "Kitchens",
    value: "kitchens",
    icon: <DiningIcon style={{ color: "#00b0ff", fontSize: "30px" }} />,
    path: "/kitchens",
  },
  {
    label: "Users",
    value: "users",
    icon: <GroupIcon style={{ color: "#ba68c8", fontSize: "30px" }} />,
    path: "/users",
  },
];

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: "#1D303A !important",
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Layout() {
  const theme = useTheme();
  const settings = ["Profile", "Admin Dashboard"];
  const [open, setOpen] = React.useState(false);
  const [selectedPage, setSelectedPage] = React.useState("/");
  const navigate = useNavigate();
  const params = useParams();
  const url = window.location.href;

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleFeatureClick = (path: string) => {
    navigate(path);
    setSelectedPage(path);
  };

  React.useEffect(() => {
    console.log(url, "[url]");
    if (url.includes("/kitchens")) {
      setSelectedPage("/kitchens");
    } else if (url.includes("/meals")) {
      setSelectedPage("/meals");
    } else if (url.includes("/users")) {
      setSelectedPage("/users");
    } else if (url.includes("/subscriptions")) {
      setSelectedPage("/subscriptions");
    } else if (url.includes("/orders")) {
      setSelectedPage("/orders");
    }
  }, [url]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar style={{ minHeight: "50px" }}>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
            }}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              style={{ marginTop: "0.3rem" }}
            >
              MealBox
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {/* <Tooltip title="Open settings"> */}
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <PersonOutlineIcon style={{ color: "#fff" }} />
            </IconButton>
            {/* </Tooltip> */}
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <List style={{ padding: 0 }}>
          {LEFT_NAV_OPTIONS.map((option) => (
            <ListItem
              key={option.value}
              disablePadding
              sx={{ display: "block" }}
              onClick={() => handleFeatureClick(option.path)}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                style={{
                  borderLeft:
                    selectedPage === option.path ? "5px solid #F5BE00" : "",
                  backgroundColor:
                    selectedPage === option.path ? "#4A5961" : "transparent",
                }}
              >
                <Tooltip title={option.label} placement="right">
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {option.icon}
                  </ListItemIcon>
                </Tooltip>

                <ListItemText
                  primary={option.label}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
    </Box>
  );
}
