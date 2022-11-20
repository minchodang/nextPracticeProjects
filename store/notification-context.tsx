import {
    createContext,
    JSXElementConstructor,
    ReactElement,
    ReactFragment,
    ReactPortal,
    SetStateAction,
    useState,
} from 'react';

type NotificationDataType = {
    title: string;
    message: string;
    status: string;
};

interface ContextTypes {
    notification: null;
    showNotification: (notificationData: NotificationDataType) => void;
    hideNotification: () => void;
}

const NotificationContext = createContext({
    notification: null, // {title, message, status}
    showNotification: function (notificationData: NotificationDataType) {},
    hideNotification: function () {},
});

export function NotificationContextProvider(props: {
    children:
        | string
        | number
        | boolean
        | ReactElement<any, string | JSXElementConstructor<any>>
        | ReactFragment
        | ReactPortal
        | null
        | undefined;
}) {
    const [activeNotification, setActiveNotification] = useState<NotificationDataType | null>();

    function showNotificationHandler(
        notificationData: SetStateAction<NotificationDataType | null | undefined>,
    ) {
        setActiveNotification(notificationData);
    }
    function hideNotificationHandler() {
        setActiveNotification(null);
    }

    const context = {
        notification: activeNotification,
        showNotification: showNotificationHandler,
        hideNotification: hideNotificationHandler,
    };
    return (
        <NotificationContext.Provider value={context as ContextTypes}>
            {props.children}
        </NotificationContext.Provider>
    );
}

export default NotificationContext;
