import * as React from 'react';

//project imports
import { ShowNotification, CloseNotification } from '@/hooks/useNotifications/useNotifications';

const NotificationsContext = React.createContext<{
  show: ShowNotification;
  close: CloseNotification;
} | null>(null);

export default NotificationsContext;
