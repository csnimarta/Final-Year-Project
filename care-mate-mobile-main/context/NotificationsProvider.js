import {createContext, useEffect, useContext, useState} from "react";
import axios from 'axios';
import {baseUrl} from './../IPConfig';
import UserContext from './../context/UserProvider';

const NotificationsContext = createContext({});

export const NotificationsProvider = ({children}) => {

    const [notifications, setNotifications] = useState([]);
    const {user} = useContext(UserContext);

    useEffect(() => {
        const fetchNotifications = async () => {
            console.log("i am " + user.data.id);
            try {
                const response = await axios.get(`${ baseUrl }/notifications/user`, {
                    params: {
                        user: user.data.id
                    }
                });
                setNotifications(response.data);
            } catch (error) {
                console.log("Could not receive notifications: " + error);
            }
        };

        if (user.data) {
            fetchNotifications();
        }
    }, [user]);

    return (
        <NotificationsContext.Provider value={{notifications, setNotifications}}>
            {children}
        </NotificationsContext.Provider>
    );
};

export default NotificationsContext;