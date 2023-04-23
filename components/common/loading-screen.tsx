import { BlurView } from 'expo-blur';
import { ActivityIndicator } from 'react-native';

const LoadingScreen = () => {
    return (
        <BlurView
            intensity={15}
            className='absolute z-50 top-0 bottom-0 left-0 right-0 backdrop-blur flex justify-center items-center'>
            <ActivityIndicator size='large' color='black' />
        </BlurView>
    );
};

export default LoadingScreen;
