import React from 'react';
import { Redirect, Route, RouteProps as ReactDOMRouteProps } from 'react-router-dom';

import { useAuth } from '../hooks/AuthContext';


interface RouteProps extends ReactDOMRouteProps {
    isPrivate?: boolean;
    component: React.ComponentType;
}

const CustomRoute: React.FC<RouteProps> = ({
    isPrivate=false,
    component: Component,
    ...rest
    }) => {

        const { user } = useAuth();

        return (
            <Route
                {...rest}
                render={({location})=>{
                    return isPrivate === !!user ? (
                        <Component />
                    ) : (
                        <Redirect to={{ 
                            pathname: isPrivate ? '/' : '/dashboard',
                            state: {from: location}
                        }} />
                    );
                }}
            />
        );
};

export default CustomRoute;