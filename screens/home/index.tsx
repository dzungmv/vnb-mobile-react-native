import type { CompositeNavigationProp } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import HeaderCmp from '../../components/common/header';
import CatalogCmp from './catalog';

const HomeSC: React.FC = () => {
    const navigation = useNavigation<CompositeNavigationProp<any, any>>();

    const [searchContainer, setSearchContainer] = useState<boolean>(false);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
            bottomTabBarVisible: true,
        });
    }, []);
    return (
        <SafeAreaView className='flex-1 bg-white'>
            <HeaderCmp title='Home' isHome />

            <View className='mt-10'>
                <CatalogCmp />
            </View>
        </SafeAreaView>
    );
};

export default HomeSC;
