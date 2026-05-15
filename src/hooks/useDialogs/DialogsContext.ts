import * as React from 'react';

//project imports
import { OpenDialog, CloseDialog } from '@/hooks/useDialogs/useDialogs';

const DialogsContext = React.createContext<{
  open: OpenDialog;
  close: CloseDialog;
} | null>(null);

export default DialogsContext;