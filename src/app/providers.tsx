import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NotificationsProvider from "../hooks/useNotifications/NotificationsProvider";
import DialogsProvider from "../hooks/useDialogs/DialogsProvider";
import ThemeCustomization from '../themes';
import { ConfigProvider } from "../contexts/ConfigContext";

const queryClient = new QueryClient();

/* Para Produccion
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 min
    },
  },
});
*/

interface Props {
  children: ReactNode;
}

export const AppProviders = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider>
        <ThemeCustomization>
          <NotificationsProvider>
            <DialogsProvider>
              {children}
            </DialogsProvider>
          </NotificationsProvider>
        </ThemeCustomization>
      </ConfigProvider>
    </QueryClientProvider>
  );
};