import { ReactNode } from 'react';
import { MainHeader } from '@components/layout/main-header';

interface LayoutProps {
    children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
    return (
        <>
            <MainHeader />
            <main>{children}</main>
        </>
    );
};
