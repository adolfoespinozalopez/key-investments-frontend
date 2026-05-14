import AutocompleteSearch from '@/components/AutocompleteSearch';
import { getData } from '../../../api/agenteData';

export default function AgenteAutocompleteSearch({ control, rules }: { control: any, rules?: object  }) {
  
  return (
    <AutocompleteSearch 
      control={control} 
      name="agente" 
      label="Agente" 
      fetchFn={getData}
      rules={rules}
    />
  );
}