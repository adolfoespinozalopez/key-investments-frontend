import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import InventoryIcon from "@mui/icons-material/Inventory";
import CasesIcon from '@mui/icons-material/Cases';
import BusinessIcon from '@mui/icons-material/Business';
import StoreIcon from '@mui/icons-material/Store';
import PolicyIcon from '@mui/icons-material/Policy';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import SsidChartIcon from '@mui/icons-material/SsidChart';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import DescriptionIcon from '@mui/icons-material/Description';
import GroupsIcon from '@mui/icons-material/Groups';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import PieChartIcon from '@mui/icons-material/PieChart';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

export const navigation = [
  {
    label: "Dashboard", path: "/", icon: <DashboardIcon />
  },
  {
    label: "Definición",
    icon: <CasesIcon />,
    children: [
      { label: "Empresas", path: "/empresa", icon: <BusinessIcon /> },
      { label: "Mercados", path: "/mercado", icon: <StoreIcon /> },
      { label: "Poliza", path: "/poliza", icon: <PolicyIcon /> }
    ]
  },
  {
    label: "Operaciones",
    icon: <ReceiptLongIcon />,
    children: [
      { 
        label: "Negociación renta variable",
        icon: <SsidChartIcon /> ,
        children: [
          { label: "Acciones", path: "/operaciones/renta-variable/acciones", icon: <DescriptionIcon /> },
          { label: "Fondos mutuos", path: "/operaciones/renta-variable/fondos-mutuos", icon: <GroupsIcon /> }
        ]
      },
      { 
        label: "Negociación renta fija", 
        icon: <AccountBalanceWalletIcon />,
        children: [
          { label: "Depositos a plazo", path: "/operaciones/renta-fija/depositos", icon: <ShowChartIcon /> },
          { label: "Bonos y letras hipotecarias", path: "/operaciones/renta-fija/bonos", icon: <GroupsIcon /> }
        ]
      },
      { label: "Negociación derivados financieros", path: "/operaciones/derivados", icon: <AccountTreeIcon /> },
    ]
  },
  {
    label: "Procesos",
    icon: <SettingsSuggestIcon />,
    children: [
      { label: "Opción 1", path: "/procesos/moneda", icon: <AccountBalanceIcon /> },
      { label: "Opción 2", path: "/procesos/line", icon: <InventoryIcon /> },
    ]
  },
  {
    label: "Reportes",
    icon: <PieChartIcon />,
    children: [
      { label: "Límites de inversión", path: "/reportes/limites-inversion", icon: <TrendingDownIcon /> }
    ]
  }
];