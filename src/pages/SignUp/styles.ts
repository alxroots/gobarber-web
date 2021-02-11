import styled, { keyframes } from 'styled-components';
import signUpBackgroundImg from '../../assets/sign-up-background.png';
import { shade } from 'polished';

export const Container = styled.div`
    height: 100vh;
    display: flex;
    align-items: stretch;
`;
export const Content = styled.div`
    display: flex;
    flex-direction: column;
    place-content: center;
    align-items: center;
    width: 100%;
    max-width: 700px;
    
`;

export const AppearFromRight = keyframes`
    from {
        opacity: 0;
        transform: translateX(50px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
`;

export const AnimationContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    animation: ${AppearFromRight} 1s;

    form {
        width: 340px;
        text-align: center;
        margin: 88px 0;    
    }
    h1 {
        margin-bottom: 24px;
    }
    a {
        display: block;
        margin-top: 24px;

        color: #F4ede8;
        text-decoration: none;
        transition: color 0.2s;

        &:hover {
            color: ${shade('0.2', '#f4ede8')};
        }
    }
    > a {
        display: flex;
        display: block;
        margin-top: 24px;
        align-items: center;

        color: #F4ede8;
        text-decoration: none;
        transition: color 0.2s;
        
        svg {
            margin-right: 16px;
        }

        &:hover {
            color: ${shade('0.2', '#f4ede8')}
        }
    }

`;

export const Background = styled.div`
    flex: 1;
    background: url(${signUpBackgroundImg}) no-repeat center;
    background-size: cover;
`;