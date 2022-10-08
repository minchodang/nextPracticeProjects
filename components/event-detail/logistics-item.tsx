import { ReactNode } from 'react';
import styled from 'styled-components';

interface LogisticsItemProps {
    children: ReactNode;
    Icon: ReactNode;
}

const ItemContainer = styled.div`
    display: flex;
    font-size: 1.5rem;
    flex-direction: column;
    color: #aefff8;
`;

const IconContainer = styled.span`
    margin-right: 1rem;
    color: #18e0d0;
    svg {
        width: 2rem;
        height: 2rem;
    }
    @media (min-width: 768px) {
        align-items: flex-start;
        text-align: left;
    }
`;

const ContentContainer = styled.span``;

function LogisticsItem({ children, Icon }: LogisticsItemProps) {
    return (
        <ItemContainer>
            <IconContainer>{Icon}</IconContainer>
            <ContentContainer>{children}</ContentContainer>
        </ItemContainer>
    );
}

export default LogisticsItem;
