import AutocompleteSearch from '@/components/AutocompleteSearch';
import { getData } from '../../../api/agenteData';

export default function AgenteAutocompleteSearch({ control }: { control: any }) {
  
  return (
    <AutocompleteSearch 
      control={control} 
      name="agente" 
      label="Agente" 
      fetchFn={getData} 
    />
  );
}