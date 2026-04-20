import { AppBar, Toolbar, IconButton, Box, Avatar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";

export const Header = ({
    toggle,
    collapsed
}: {
    toggle: () => void;
    collapsed: boolean;
}) => {
    return (
        <AppBar
            position="fixed"
            elevation={0}
            sx={{
                width: "100%",
                ml: 0,
                zIndex: (theme) => ({
                    xs: 99,
                    md: 100
                }),
                // 2. Añade la línea inferior
                borderBottom: "1px solid #cccccc",
                borderColor: "divider", // Usa el color estándar de MUI o uno personalizado (ej: '#e0e0e0')
                backgroundColor: "#ffffff", // Asegúrate de que el fondo sea blanco para que la línea resalte
                color: "#333333" // Color del texto e iconos
            }}
        >
            <Toolbar>
                <IconButton onClick={toggle} color="inherit" >
                    {collapsed ? <MenuIcon /> : <MenuOpenIcon />}
                </IconButton>

                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Key Portfolio Mangement
                </Typography>

                <Box display="flex" alignItems="center" gap={2}>
                    <Typography variant="body2">Admin</Typography>
                    <Avatar />
                </Box>
            </Toolbar>
        </AppBar>
    );
};