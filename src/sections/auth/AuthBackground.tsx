// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

// ==============================|| AUTHENTICATION - BACKGROUND ||============================== //

export function AuthBackground() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'absolute',
        filter: 'blur(18px)',
        zIndex: -1,
        bottom: 0,
        transform: 'inherit'
      }}
    >
      <svg
        width="100%"
        height="calc(100vh - 175px)"
        viewBox="0 0 405 609"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M323.98 149.311L112.185 15.2641C103.562 9.81927 92.4443 15.2728 91.4648 25.334L81.1546 131.332L8.93816 193.304C1.39248 199.778 2.13127 211.4 10.3708 216.924L125.667 294.124L180.478 400.033C184.691 408.173 196.223 408.358 200.678 400.363L252.925 306.49L338.314 263.26C347.11 258.807 348.123 246.612 340.232 240.781L323.98 149.311Z"
          fill={theme.palette.grey[100]}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M404.307 489.171L364.126 313.514C362.485 306.331 354.201 303.111 348.103 307.304L284.181 351.246L190.17 313.251C182.203 310.031 173.666 316.024 174.008 324.58L177.584 414.244L114.77 477.541C108.835 483.52 111.45 493.682 119.789 496.064L236.425 529.387L314.935 606.319C320.971 612.234 331.026 609.117 332.721 600.741L350.485 513.064L402.164 502.128C407.495 500.998 408.706 493.992 404.307 489.171Z"
          fill={theme.palette.grey[200]}
        />
      </svg>
    </Box>
  );
}