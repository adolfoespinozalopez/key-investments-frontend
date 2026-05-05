import React, { useEffect, useState, MouseEvent, ChangeEvent } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// third-party
import * as Yup from 'yup';
import { Formik, FormikHelpers } from 'formik';

// project imports
import IconButton from '@/components/@extended/IconButton';
import AnimateButton from '@/components/@extended/AnimateButton';
import { strengthColor, strengthIndicator } from '@/utils/password-strength';

// assets
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

//types
import { AuthRegisterValues } from '@/types/AuthRegisterValues';

interface PasswordLevel {
  label: string;
  color: string;
}

// ============================|| JWT - REGISTER ||============================ //

export function AuthRegister() {
  const [level, setLevel] = useState<PasswordLevel | undefined>();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const changePassword = (value: string) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword('');
  }, []);

  return (
    <>
      <Formik
        initialValues={{
          firstname: '',
          lastname: '',
          email: '',
          company: '',
          password: '',
          submit: null
        } as AuthRegisterValues}
        validationSchema={Yup.object().shape({
          firstname: Yup.string().max(255).required('El nombre es requerido'),
          lastname: Yup.string().max(255).required('El apellido es requerido'),
          email: Yup.string().email('Debe ser un correo válido').max(255).required('El correo es requerido'),
          password: Yup.string()
            .required('La contraseña es requerida')
            .test('no-leading-trailing-whitespace', 'La contraseña no puede empezar ni terminar con espacios', (value) => 
              value ? value === value.trim() : true
            )
            .max(10, 'La contraseña debe tener menos de 10 caracteres')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            setStatus({ success: true });
            setSubmitting(false);

            // 1. Simulación de llamada a API
            console.log('Intentando register with:', values);

          } catch (err: any) {
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, touched, values, handleSubmit, isSubmitting }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Stack sx={{ gap: 1 }}>
                  <InputLabel htmlFor="firstname-signup">Nombre*</InputLabel>
                  <OutlinedInput
                    id="firstname-login"
                    type="text"
                    value={values.firstname}
                    name="firstname"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Juan"
                    fullWidth
                    size="small"
                    error={Boolean(touched.firstname && errors.firstname)}
                  />
                </Stack>
                {touched.firstname && errors.firstname && (
                  <FormHelperText error id="helper-text-firstname-signup">
                    {errors.firstname}
                  </FormHelperText>
                )}
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Stack sx={{ gap: 1 }}>
                  <InputLabel htmlFor="lastname-signup">Apellido*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    size="small"
                    error={Boolean(touched.lastname && errors.lastname)}
                    id="lastname-signup"
                    type="text"
                    value={values.lastname}
                    name="lastname"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Pérez"
                  />
                </Stack>
                {touched.lastname && errors.lastname && (
                  <FormHelperText error id="helper-text-lastname-signup">
                    {errors.lastname}
                  </FormHelperText>
                )}
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Stack sx={{ gap: 1 }}>
                  <InputLabel htmlFor="company-signup">Empresa</InputLabel>
                  <OutlinedInput
                    fullWidth
                    size="small"
                    error={Boolean(touched.company && errors.company)}
                    id="company-signup"
                    value={values.company}
                    name="company"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Demo Inc."
                  />
                </Stack>
                {touched.company && errors.company && (
                  <FormHelperText error id="helper-text-company-signup">
                    {errors.company}
                  </FormHelperText>
                )}
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Stack sx={{ gap: 1 }}>
                  <InputLabel htmlFor="email-signup">Correo Electrónico*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    size="small"
                    error={Boolean(touched.email && errors.email)}
                    id="email-login"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="demo@empresa.com"
                  />
                </Stack>
                {touched.email && errors.email && (
                  <FormHelperText error id="helper-text-email-signup">
                    {errors.email}
                  </FormHelperText>
                )}
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Stack sx={{ gap: 1 }}>
                  <InputLabel htmlFor="password-signup">Contraseña</InputLabel>
                  <OutlinedInput
                    fullWidth
                    size="small"
                    error={Boolean(touched.password && errors.password)}
                    id="password-signup"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      handleChange(e);
                      changePassword(e.target.value);
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="cambiar visibilidad de contraseña"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          color="secondary"
                        >
                          {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="******"
                  />
                </Stack>
                {touched.password && errors.password && (
                  <FormHelperText error id="helper-text-password-signup">
                    {errors.password}
                  </FormHelperText>
                )}
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid>
                      <Box sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px' }} />
                    </Grid>
                    <Grid>
                      <Typography variant="subtitle1" fontSize="0.75rem">
                        {level?.label}
                      </Typography>
                    </Grid>
                  </Grid>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Typography variant="body2">
                  Al registrarte, aceptas nuestros &nbsp;
                  <Link variant="subtitle2" component={RouterLink} to="#">
                    Términos de Servicio
                  </Link>
                  &nbsp; y &nbsp;
                  <Link variant="subtitle2" component={RouterLink} to="#">
                    Política de Privacidad
                  </Link>
                </Typography>
              </Grid>
              {errors.submit && (
                <Grid size={{ xs: 12 }}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid size={{ xs: 12 }}>
                <AnimateButton>
                  <Button 
                    disableElevation 
                    disabled={isSubmitting} 
                    fullWidth 
                    size="large" 
                    type="submit" 
                    variant="contained" 
                    color="primary"
                  >
                    Crear cuenta
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