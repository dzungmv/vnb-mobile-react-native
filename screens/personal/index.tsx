import {
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Entypo, Ionicons, AntDesign } from '@expo/vector-icons';

import HeaderCmp from '../../components/common/header';
import {
    CompositeNavigationProp,
    useNavigation,
} from '@react-navigation/native';

const PersonalSC: React.FC = () => {
    const navigation = useNavigation<CompositeNavigationProp<any, any>>();
    return (
        <SafeAreaView className='flex-1 bg-blue-500'>
            <HeaderCmp title='Personal' titleColor='white' />

            <View className='px-4 mt-20 bg-white flex-1 rounded-t-[55px]'>
                <View className=' p-2 flex justify-center items-center -mt-12'>
                    <View className='w-[70px] h-[70px] bg-gray-200 flex justify-center items-center rounded-full relative'>
                        <View className='absolute top-0'>
                            <Entypo name='user' size={70} color='black' />
                        </View>
                    </View>

                    <Text className='ml-2 text-2xl font-bold'>John Doe</Text>
                </View>

                <View className='flex-row justify-between mt-4'>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Ordered')}
                        className='w-[50%] px-4 mt-4 flex-row rounded-lg py-2 items-center'>
                        <AntDesign name='tags' size={30} color='black' />
                        <Text className='ml-2 text-xl font-medium'>
                            Ordered
                        </Text>
                    </TouchableOpacity>
                    <View className='w-[50%] px-4 py-2 mt-4 flex-row rounded-lg flex justify-end items-center'>
                        <Ionicons name='cart-sharp' size={30} color='black' />
                        <Text className='ml-2 text-xl font-medium'>Cart</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default PersonalSC;
