import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function Footer() {
  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      sx={{ gap: 1.5, alignItems: 'center', justifyContent: 'space-between', p: '10px 14px 0px', mt: 'auto' }}
    >
      <Typography variant="caption">
        &copy; All rights reserved{' '}
        <Link href="#" target="_blank" underline="hover">
          KeySolutions
        </Link>
      </Typography>
      <Stack direction="row" sx={{ gap: 1.5, alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="#" target="_blank" variant="caption" color="text.primary" underline="hover">
          Hire us
        </Link>
        <Link href="#" target="_blank" variant="caption" color="text.primary" underline="hover">
          License
        </Link>
        <Link href="#" target="_blank" variant="caption" color="text.primary" underline="hover">
          Terms
        </Link>
      </Stack>
    </Stack>
  );
}