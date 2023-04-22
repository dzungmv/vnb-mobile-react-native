import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './components/tabs/TabNavigation';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './components/_redux/store';
import LoginSC from './screens/auth/login';
import MainStack from './components/stacks/main-stack';

export default function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <NavigationContainer>
                    <MainStack />
                </NavigationContainer>
            </PersistGate>
        </Provider>
    );
}
