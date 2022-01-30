import UserContext from './UserContext';
import UserReducer from './UserReducer';
import Cookies from 'js-cookie';
import { useReducer } from 'react';
import apiCall from '../../api';

export default function UserState({ children }) {

    const initialState = {
        userInfo: Cookies.get('userInfo') ? JSON.parse(Cookies.get('userInfo')) : null,
        errorMessage: null, 
    };

    const [state, dispatch] = useReducer(UserReducer, initialState);

    const getUser = async (email, password) => {
        try {
            const user = await apiCall({
                url: 'https://apibooksinvent.herokuapp.com/api/users/login',
                method: 'POST', 
                body: JSON.stringify({email, password }),
                headers: {'Content-Type': 'application/json'}, 
            })
            if(user.status === 200) {
                const data = await user.json()
                dispatch({ type: 'USER_LOGIN', payload: data });
            } else if (user.status === 401 || user.status === 400) {
                const error = await user.json()
                dispatch({ type: 'ERROR_MESSAGE', payload: error}); 
            }
        } catch (error) {
            console.log(error);  
        }
    }

    const setUser = async (name, email, password) => {
        try {
            const newUser = await apiCall({
                url: 'https://apibooksinvent.herokuapp.com/api/users/register',
                method: 'POST',
                body: JSON.stringify({ name, email, password }),
                headers: { 'Content-Type': 'application/json' },
            })
            if(newUser.status === 200) {
                const data = await newUser.json()
                dispatch({ type: 'USER_LOGIN', payload: data });
            } else if (newUser.status === 400) {
                const error = await newUser.json()
                dispatch({ type: 'ERROR_MESSAGE', payload: error}); 
            }
        } catch (error) {
            console.log(error);  
        }
    }

    const signOff = () => {
        dispatch({ type: 'USER_LOGOUT' });
    }

    return (
        <UserContext.Provider value={
            {
                userInfo: state.userInfo,
                errorMessage: state.errorMessage, 
                getUser,
                setUser, 
                signOff
            }
        }>
            {children}
        </UserContext.Provider>
    )
}