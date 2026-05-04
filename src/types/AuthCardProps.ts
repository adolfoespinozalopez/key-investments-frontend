import { ReactNode } from 'react';

export interface AuthCardProps {
  children?: ReactNode;
  // Usamos [key: string]: any para permitir cualquier otra prop 
  // que MainCard acepte (como sx, border, etc.)
  [key: string]: any; 
}