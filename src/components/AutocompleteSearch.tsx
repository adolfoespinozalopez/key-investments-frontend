import * as React from 'react';
import { TextField, Autocomplete, Box, Typography, CircularProgress } from '@mui/material';
import { Controller, Control } from 'react-hook-form';
import { Option } from '../types/Option';

interface GenericAutocompleteProps {
  control: Control<any>;
  name: string;
  label: string;
  fetchFn: () => Promise<Option[]>; // La función que trae la data
  rules?: object; // <-- Nueva prop para validaciones
}

export default function AutocompleteSearch({ control, name, label, fetchFn, rules }: GenericAutocompleteProps) {
  const [options, setOptions] = React.useState<Option[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [inputValue, setInputValue] = React.useState('');
  const hint = React.useRef('');

  React.useEffect(() => {
    let active = true;
    (async () => {
      setLoading(true);
      try {
        const data = await fetchFn();
        if (active) {
          setOptions(data);
          setLoading(false);
        }
      } catch (error) {
        console.error(`Error cargando ${label}:`, error);
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, [fetchFn, label]);

  return (
    <Controller
      name={name}
      control={control}
      rules={rules} // <-- Pasamos las reglas de validación
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Autocomplete
          id={`autocomplete-${name}`}
          options={options}
          loading={loading}
          inputValue={inputValue}
          // Maneja la selección del item
          onChange={(_, newValue) => {
            setInputValue(newValue ? newValue.label : '');
            onChange(newValue); 
          }}
          // Maneja lo que el usuario escribe para el "Hint"
          onInputChange={(_, newInputValue) => {
            setInputValue(newInputValue);
            const matchingOption = options.find((option) =>
              option.label.toLowerCase().startsWith(newInputValue.toLowerCase())
            );
            hint.current = (newInputValue && matchingOption) ? matchingOption.label : '';
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
              <Typography
                sx={{
                  position: 'absolute',
                  opacity: 0.4,
                  left: 14,
                  top: 9,
                  zIndex: 0,
                  pointerEvents: 'none',
                  fontSize: '0.875rem'
                }}
              >
                {hint.current && inputValue && hint.current.toLowerCase().startsWith(inputValue.toLowerCase()) 
                  ? inputValue + hint.current.slice(inputValue.length) 
                  : ''}
              </Typography>
              <TextField
                {...params}
                label={label}
                size="small"
                fullWidth
                className="xsmall-input-search"
                error={!!error} 
                helperText={error?.message}
                slotProps={{
                  input: {
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  },
                }}
              />
            </Box>
          )}
        />
      )}
    />
  );
}