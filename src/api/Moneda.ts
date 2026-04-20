export interface Moneda {
  id: number;
  description: string;
  descriptionLarge: string;
  symbol : string;
  codeSbs: string;
  nationality: string;
  flagVac: boolean;
  currencyExchange: string;
  exchangeRate: string;
}

const INITIAL_MONEDA_LIST: Moneda[] = [
  {
    id: 1,
    description: 'Soles - Moneda Nacional',
    descriptionLarge: 'Soles Peruanos',
    symbol: 'S/.',
    codeSbs: '1',
    nationality: 'Nacional',
    flagVac: false,
    currencyExchange: 'US$',
    exchangeRate: 'Inversa'
  },
  {
    id: 2,
    description: 'Dolares - Moneda Extranjera',
    descriptionLarge: 'Dolares Estadounidenses',
    symbol: 'US$',
    codeSbs: '2',
    nationality: 'Extranjero',
    flagVac: false,
    currencyExchange: 'S/.',
    exchangeRate: 'Directa'
  },
  {
    id: 3,
    description: 'Yen Japones',
    descriptionLarge: 'Yen Japoneses',
    symbol: 'JPY',
    codeSbs: '5',
    nationality: 'Extranjero',
    flagVac: false,
    currencyExchange: 'US$',
    exchangeRate: 'Inversa'
  },
  {
    id: 4,
    description: 'Euro',
    descriptionLarge: 'Euros',
    symbol: 'EUR',
    codeSbs: '4',
    nationality: 'Extranjero',
    flagVac: false,
    currencyExchange: 'US$',
    exchangeRate: 'Directa'
  }
];