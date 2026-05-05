import React, { useState, MouseEvent, ChangeEvent } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// material-ui
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// third-party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import IconButton from '@/components/@extended/IconButton';
import AnimateButton from '@/components/@extended/AnimateButton';

// assets
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

// ============================|| JWT - LOGIN ||============================ //

export function AuthLogin() {
  const [checked, setChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <Formik
        initialValues={{
          email: 'info@keysolutions.com',
          password: 'abc.1234',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email('Debe ser un correo electrónico válido.')
            .max(255)
            .required('El correo es requerido'),
          password: Yup.string()
            .required('La contraseña es requerida')
            .max(10, 'La contraseña debe tener menos de 10 caracteres')
            .test(
              'no-leading-trailing-whitespace',
              'La contraseña no puede comenzar ni terminar con espacios',
              (value) => value === value?.trim()
            )												
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            // 1. Simulación de llamada a API
            console.log('Intentando login con:', values);
            
            // Aquí llamarías a tu servicio: const response = await loginService(values);
            // Supongamos que recibimos un token y datos del usuario:
            const mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";
            const userData = { email: values.email, role: 'admin' };

            // 2. Almacenamiento en LocalStorage
            localStorage.setItem('token', mockToken);
            localStorage.setItem('user', JSON.stringify(userData));

            setStatus({ success: true });
            setSubmitting(false);

            // 3. Redirección (opcional)
            navigate('/dashboard');
          } catch (err: any) {
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12 }} >
                <Stack sx={{ gap: 1 }}>
                  <InputLabel htmlFor="email-login">Correo</InputLabel>
                  <OutlinedInput
                    id="email-login"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    fullWidth
                    size="small"
                    error={Boolean(touched.email && errors.email)}
                  />
                </Stack>
                {touched.email && errors.email && (
                  <FormHelperText error id="standard-weight-helper-text-email-login">
                    {errors.email}
                  </FormHelperText>
                )}
              </Grid>
              
              <Grid size={{ xs: 12 }}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-login">Contraseña</InputLabel>
                  <OutlinedInput
                    error={Boolean(touched.password && errors.password)}
                    id="password-login"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    fullWidth
                    size="small"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          color="secondary"
                        >
                          {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="Enter password"
                  />
                </Stack>
                {touched.password && errors.password && (
                  <FormHelperText error id="standard-weight-helper-text-password-login">
                    {errors.password}
                  </FormHelperText>
                )}
              </Grid>

              <Grid size={{ xs: 12 }} sx={{ mt: -1 }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={0}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setChecked(event.target.checked)}
                        name="checked"
                        color="primary"
                        size="small"
                      />
                    }
                    label={<Typography variant="h6">No cerrar sesión</Typography>}
                  />
                  <Link variant="h6" component={RouterLink} to="#" color="text.primary">
                    He olvidado mi contraseña
                  </Link>
                </Stack>
              </Grid>

              <Grid size={{ xs: 12 }}>
                <AnimateButton>
                  <Button 
                    disableElevation
                    disabled={isSubmitting}
                    fullWidth size="large" variant="contained"
                    type="submit"
                    color="primary">
                    Entrar
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
}