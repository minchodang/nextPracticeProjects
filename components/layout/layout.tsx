import { ReactNode, useContext } from 'react';
import { MainHeader } from '@components/layout/main-header';
import NotificationContext from '../../store/notification-context';
import Notification from '@components/ui/Notification';

interface LayoutProps {
    children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
    const notificationCtx = useContext(NotificationContext);

    const activeNotification = notificationCtx.notification;

    return (
        <>
            <MainHeader />
            <main>{children}</main>
            {activeNotification && (
                <Notification
                    title={activeNotification.title}
                    message={activeNotification.message}
                    status={activeNotification.status}
                />
            )}
        </>
    );
};
