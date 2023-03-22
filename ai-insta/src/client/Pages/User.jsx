import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import {
    Avatar,
    Button,
    Card,
    CardHeader,
    CardMedia,
    TextField,
} from "@mui/material";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import FeedItem from "../components/FeedItem";
import EditIcon from "@mui/icons-material/Edit";

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
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

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
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

export default function MiniDrawer({
    isLoggedIn,
    setIsLoggedIn,
    setShowModal,
}) {
    let { userId } = useParams();
    const [userData, setUserData] = useState([]);
    const [editing, setEditing] = useState(false);
    const [bio, setBio] = useState("");
    const [isAuth, setIsAuth] = useState(false);
    const [myProfileUrl, setMyProfileUrl] = useState("");
    const myProfileButton = () => {
        const data = {
            email: localStorage.getItem("email"),
        };
        axios
            .post("http://localhost:8080/myaccid", data)
            .then((response) => navigate(`/user/${response.data._id}`))
            .catch((e) => console.log(e));
    };
    const editBio = () => {
        if (!bio) {
            return;
        }
        const data = {
            userId: userId,
            newBio: bio,
        };
        axios
            .post("http://localhost:8080/editbio", data)
            .then((response) => {
                console.log(response.data);
                setEditing(false);
            })
            .catch((e) => console.log(e));
    };
    useEffect(() => {
        const session = localStorage.getItem("logged_in");
        if (session === "true") {
            setIsLoggedIn(true);
        }
        console.log("running");
        axios
            .get(`http://localhost:8080/users/${userId}`)
            .then((response) => {
                setUserData(response.data);
                setBio(response.data[0].biography);
                if (response.data[0].email === localStorage.getItem("email")) {
                    setIsAuth(true);
                }
            })
            .catch((e) => console.log(e));
    }, [userId, editing]);
    const logOut = () => {
        setIsLoggedIn(false);
        localStorage.setItem("logged_in", false);
        localStorage.removeItem("email");
        window.location.reload();
    };

    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    console.log(bio);

    const navigate = useNavigate();
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: {
                    xs: "column",
                    sm: "column",
                    md: "column",
                    lg: "row",
                },
            }}
        >
            <CssBaseline />
            <AppBar
                position="fixed"
                open={open}
                sx={{
                    backgroundColor: "#9CA9FD",
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
                }}
            >
                <Toolbar
                    sx={{ display: "flex", justifyContent: "space-between" }}
                >
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: "none" }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    {isLoggedIn ? (
                        <Box
                            sx={{
                                display: {
                                    xs: "none",
                                    sm: "none",
                                    md: open ? "none" : "flex",
                                    lg: open ? "none" : "flex",
                                },
                            }}
                        >
                            <Button
                                variant="h6"
                                component="div"
                                onClick={() => {
                                    navigate("/");
                                    setShowModal(true);
                                }}
                            >
                                Create Post
                            </Button>
                            <Button
                                variant="h6"
                                component="div"
                                onClick={logOut}
                            >
                                Log Out
                            </Button>
                        </Box>
                    ) : (
                        <Box sx={{ display: open ? "none" : "flex" }}>
                            <Button
                                variant="h6"
                                component="div"
                                onClick={() => navigate("/login")}
                            >
                                Log In
                            </Button>
                        </Box>
                    )}
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                open={open}
                sx={{
                    display: {
                        xs: open ? "flex" : "none",
                        sm: open ? "flex" : "none",
                        md: open ? "flex" : "none",
                        lg: "flex",
                    },
                }}
            >
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
                <List>
                    <ListItem disablePadding sx={{ display: "block" }}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? "initial" : "center",
                            }}
                            onClick={() => navigate("/")}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : "auto",
                                    justifyContent: "center",
                                }}
                            >
                                <DynamicFeedIcon />
                            </ListItemIcon>

                            <ListItemText
                                primary="Feed"
                                sx={{ opacity: open ? 1 : 0 }}
                            />
                        </ListItemButton>
                    </ListItem>
                    <ListItem
                        disablePadding
                        sx={{ display: isLoggedIn ? "block" : "none" }}
                    >
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? "initial" : "center",
                            }}
                            onClick={myProfileButton}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : "auto",
                                    justifyContent: "center",
                                }}
                            >
                                <AccountCircleIcon />
                            </ListItemIcon>

                            <ListItemText
                                primary="Profile"
                                sx={{ opacity: open ? 1 : 0 }}
                            />
                        </ListItemButton>
                    </ListItem>
                    <ListItem
                        disablePadding
                        sx={{ display: isLoggedIn ? "block" : "none" }}
                    >
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? "initial" : "center",
                            }}
                            onClick={() => {
                                navigate("/");
                                setShowModal(true);
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : "auto",
                                    justifyContent: "center",
                                }}
                            >
                                <AddCircleOutlineIcon />
                            </ListItemIcon>

                            <ListItemText
                                primary="Create Post"
                                sx={{ opacity: open ? 1 : 0 }}
                            />
                        </ListItemButton>
                    </ListItem>
                    <ListItem
                        disablePadding
                        sx={{ display: isLoggedIn ? "block" : "none" }}
                    >
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? "initial" : "center",
                            }}
                            onClick={logOut}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : "auto",
                                    justifyContent: "center",
                                }}
                            >
                                <LogoutIcon />
                            </ListItemIcon>

                            <ListItemText
                                primary="Log Out"
                                sx={{ opacity: open ? 1 : 0 }}
                            />
                        </ListItemButton>
                    </ListItem>
                </List>
                <Divider />
            </Drawer>
            <Card
                component="main"
                sx={{
                    flex: 0.3,
                    p: 3,
                    height: "100vh",
                    flexDirection: "column",
                    // pr: { xs: 0, sm: 0, md: 3, lg: 3 },
                }}
            >
                <DrawerHeader />

                <Card
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        mb: "16px",
                        backgroundColor: "white",
                        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
                    }}
                >
                    <Avatar
                        src=""
                        alt=""
                        sx={{
                            height: "20vh",
                            width: "20vh",
                            m: "10px",
                            mt: "30px",
                            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
                        }}
                    />
                    <CardHeader
                        title={`${userData[0] ? userData[0].firstName : ""} ${
                            userData[0] ? userData[0].lastName : ""
                        }`}
                        sx={{ mb: "10px" }}
                    />

                    <Card
                        sx={{
                            p: "10px",
                            width: "100%",
                            m: 0,
                            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
                            position: "relative",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                mb: "10px",
                            }}
                        >
                            <Typography
                                variant="h7"
                                sx={{ fontWeight: "bold" }}
                            >
                                About Me
                            </Typography>
                            {isLoggedIn ? (
                                isAuth ? (
                                    <IconButton
                                        sx={{
                                            position: "absolute",
                                            top: 0,
                                            right: 0,
                                        }}
                                        aria-label="edit bio"
                                        onClick={() => setEditing(true)}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                ) : null
                            ) : null}
                        </Box>
                        {editing ? (
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <TextField
                                    multiline
                                    defaultValue={userData[0]?.biography}
                                    row={3}
                                    onChange={(e) => setBio(e.target.value)}
                                />
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        mt: "10px",
                                    }}
                                >
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        onClick={() => setEditing(false)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        variant="contained"
                                        size="small"
                                        sx={{ ml: 1 }}
                                        onClick={editBio}
                                    >
                                        Save
                                    </Button>
                                </Box>
                            </Box>
                        ) : (
                            <Typography paragraph>
                                {userData[0]?.biography}
                            </Typography>
                        )}
                    </Card>
                </Card>
            </Card>

            <Card
                component="main"
                sx={{
                    flex: 0.7,
                    p: 3,
                    height: "100vh",
                    overflowY: "scroll",
                    pr: 3,
                    pl: 3,
                }}
            >
                <DrawerHeader
                    sx={{
                        display: {
                            xs: "none",
                            sm: "none",
                            md: "none",
                            lg: "flex",
                        },
                    }}
                />
                <Box
                    sx={{
                        // display: "grid",
                        // gridTemplateColumns:
                        //     "repeat(auto-fit, minmax(450px, 1fr))",
                        // gridTemplateRows: "auto",
                        // gap: "1rem",
                        // justifyContent: "center",
                        // alignItems: "center",
                        // [theme.breakpoints.down("sm")]: {
                        //     gridTemplateColumns: "1fr",
                        //     gap: "0.5rem",
                        // },
                        // display: "flex",
                        // flexWrap: "wrap",
                        display: "flex",
                        // flexWrap: "wrap",
                        // justifyContent: "center",
                        // alignItems: "center",

                        justifyContent: "space-between",
                        flexDirection: "row-reverse",
                        flexWrap: "wrap-reverse",
                        gap: "5px",
                    }}
                >
                    {userData[1]?.map((post, index) => {
                        console.log(post);
                        return (
                            <FeedItem
                                key={index}
                                title={post.title}
                                imageURL={post.imageURL}
                                description={post.description}
                                postedBy={post.postedBy}
                            />
                        );
                    })}
                </Box>
            </Card>
        </Box>
    );
}
