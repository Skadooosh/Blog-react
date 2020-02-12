import {CognitoUserPool} from 'amazon-cognito-identity-js';

export const POOL_DATA = {
    UserPoolId: 'ap-south-1_3fz4uuFk9',
    ClientId: '36ubrnr70p57f5l43g600h1uk1'
}

export const userPool = new CognitoUserPool(POOL_DATA);

export const getAuthenticatedUser = () => {
    return userPool.getCurrentUser();
}

export const logout = () => {
    getAuthenticatedUser().signOut();
}

export const isAuthenticated = () => {

    const user = getAuthenticatedUser();
    if(!user) {
        return false;
    } else {    
        let validUser = false;    
        user.getSession((err,session) => {
            if(err) {
                validUser = false
            } else {
                if(session.isValid()) {
                    validUser = true
                } else {
                    validUser = false
                }
            }
        })
        return validUser;
    }
}