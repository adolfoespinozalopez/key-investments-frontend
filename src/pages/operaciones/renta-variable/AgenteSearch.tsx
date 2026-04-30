import * as React from 'react';
import { TextField, Autocomplete, Box, Typography, CircularProgress } from '@mui/material';
import { Controller } from 'react-hook-form';
import { getData } from '../../../api/agenteData';

interface AgenteOption {
  id: string;
  label: string;
}

export default function AgenteAutocomplete({ control }: { control: any }) {
  const [options, setOptions] = React.useState<AgenteOption[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [inputValue, setInputValue] = React.useState('');
  const hint = React.useRef('');

  // 1. Cargar los datos una sola vez al montar el componente
  React.useEffect(() => {
    let active = true;

    (async () => {
      setLoading(true);
      const data = await getData(); // Esperamos la promesa
      if (active) {
        setOptions(data as AgenteOption[]);
        setLoading(false);
      }
    })();

    return () => { active = false; };
  }, []);

  return (
    <Controller
      name="agente"
      control={control}
      render={({ field: { onChange, value } }) => (
        <Autocomplete
          id="agente-autocomplete"
          options={options}
          loading={loading}
          inputValue={inputValue}
          // Manejo del cambio de valor para React Hook Form
          onChange={(event, newValue) => {
            const val = newValue ? newValue.label : '';
            setInputValue(val);
            onChange(newValue); // Enviamos el objeto completo o el label al form
          }}
          // Manejo del texto escrito para el "Hint"
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
            const matchingOption = options.find((option) =>
              option.label.toLowerCase().startsWith(newInputValue.toLowerCase())
            );
            if (newInputValue && matchingOption) {
              hint.current = matchingOption.label;
            } else {
              hint.current = '';
            }
          }}
          onKeyDown={(event) => {
            if (event.key === 'Tab' && hint.current) {
              setInputValue(hint.current);
              onChange(options.find(o => o.label === hint.current));
              event.preventDefault();
            }
          }}
          onClose={() => { hint.current = ''; }}
          renderInput={(params) => (
            <Box sx={{ position: 'relative' }}>
              {/* Capa de sugerencia (Hint) */}
              <Typography
                sx={{
                  position: 'absolute',
                  opacity: 0.4,
                  left: 14,
                  top: 9, // Ajustado para size="small"
                  zIndex: 0,
                  pointerEvents: 'none',
                  fontSize: '0.875rem'
                }}
              >
                {/* Solo mostrar hint si lo que escribió el usuario coincide al inicio */}
                {hint.current && inputValue && hint.current.toLowerCase().startsWith(inputValue.toLowerCase()) 
                  ? inputValue + hint.current.slice(inputValue.length) 
                  : ''}
              </Typography>
              <TextField
                {...params}
                label="Agente"
                size="small"
                fullWidth
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {loading ? <CircularProgress color="inherit" size={20} /> : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
              />
            </Box>
          )}
        />
      )}
    />
  );
}