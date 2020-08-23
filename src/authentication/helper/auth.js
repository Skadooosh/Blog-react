import {CognitoUserPool} from 'amazon-cognito-identity-js';

export const POOL_DATA = {
    UserPoolId: '',
    ClientId: ''
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
