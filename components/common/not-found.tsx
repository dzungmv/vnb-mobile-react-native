import AnimatedLottieView from 'lottie-react-native';
import { Text, View } from 'react-native';

import animation from './../../components/ui-data/animation.json';

type NotFoundProps = {
    title: string;
    titleColor?: string;
};

const NotFound = ({ title, titleColor = 'black' }: NotFoundProps) => {
    return (
        <View className='flex justify-center items-center flex-1'>
            <AnimatedLottieView
                style={{
                    width: 300,
                    height: 300,
                }}
                source={animation}
                autoPlay
                loop
            />
            <Text
                className='mt-3 text-2xl font-semibold'
                style={{
                    color: titleColor,
                }}>
                {title}
            </Text>
        </View>
    );
};

export default NotFound;
