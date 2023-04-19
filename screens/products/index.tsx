import FontAwesome from '@expo/vector-icons/FontAwesome';
import type { CompositeNavigationProp } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect, useState } from 'react';
import { Image, SafeAreaView, TouchableOpacity, View } from 'react-native';
import { Logo } from '../../assets';
import Search from '../../components/search';

const ProductsSC: React.FC = () => {
    const navigation = useNavigation<CompositeNavigationProp<any, any>>();

    const [searchContainer, setSearchContainer] = useState<boolean>(false);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
            bottomTabBarVisible: true,
        });
    }, []);
    return (
        <View>
            <SafeAreaView className='flex-1'>
                <View className='flex-row items-center justify-between gap-4 px-5'>
                    <Image
                        source={Logo}
                        className='w-[60px] h-[60px] object-cover'
                    />
                    <TouchableOpacity
                        className=' h-10 w-10 flex items-center justify-center rounded-full bg-gray-300'
                        onPress={() => setSearchContainer(!searchContainer)}>
                        <FontAwesome name='search' size={25} />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            {searchContainer && <Search />}
        </View>
    );
};

export default ProductsSC;
