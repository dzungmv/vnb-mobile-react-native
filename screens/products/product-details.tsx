import {
    CompositeNavigationProp,
    RouteProp,
    useNavigation,
    useRoute,
} from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import {
    Dimensions,
    Image,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import RenderHtml from 'react-native-render-html';

import { FontAwesome5, Ionicons, Zocial } from '@expo/vector-icons';

import { ProductType } from '../../components/types';

const ProductDetails = () => {
    const navigation = useNavigation<CompositeNavigationProp<any, any>>();
    const router =
        useRoute<RouteProp<Record<string, { data: ProductType }>, string>>();

    const product = router?.params?.data;

    const width = Dimensions.get('window').width;

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);
    return (
        <SafeAreaView className='flex-1 bg-white relative'>
            <ScrollView>
                <View className='px-4'>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons
                            name='arrow-back-sharp'
                            size={35}
                            color='black'
                        />
                    </TouchableOpacity>
                </View>
                <View className=''>
                    <Image
                        source={{ uri: product?.image }}
                        className='w-full h-[320px] rounded-[10px] !mix-blend-multiply'
                        resizeMode='contain'
                    />
                </View>

                <View className='px-4 mt-5'>
                    <Text className='text-[22px] font-medium '>
                        {product?.name}
                    </Text>
                    <Text className='mt-4 text-lg text-primary'>
                        {product?.price?.toLocaleString()}₫
                    </Text>

                    <View className=''>
                        {product?.endows?.map((item, index: number) => {
                            return (
                                <View
                                    className='flex-row items-center gap-2 mt-1'
                                    key={index}
                                    style={{
                                        width: width - 10,
                                    }}>
                                    <FontAwesome5
                                        name='check-circle'
                                        size={15}
                                        color='violet'
                                    />
                                    <Text>{item}</Text>
                                </View>
                            );
                        })}
                    </View>

                    <View className='mt-10'>
                        <View className='flex-row justify-between items-center'>
                            <View>
                                <Zocial name='cart' size={32} color='black' />
                            </View>
                            <TouchableOpacity className='flex justify-center items-center py-3 px-3 rounded-[10px] bg-black'>
                                <Text className='text-white text-xl font-medium'>
                                    <Ionicons name='cart' size={20} /> Add to
                                    cart
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {product?.description &&
                        product?.description?.length > 0 && (
                            <View className='mt-14'>
                                <Text className='text-xl font-medium'>
                                    Description
                                </Text>

                                <View>
                                    <RenderHtml
                                        contentWidth={width}
                                        source={{ html: product?.description }}
                                    />
                                </View>
                            </View>
                        )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ProductDetails;
