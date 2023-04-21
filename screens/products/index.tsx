import { AntDesign } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Image,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import Config from 'react-native-config';

import { Dimensions } from 'react-native';
import Search from '../../components/search';

import {
    CompositeNavigationProp,
    useNavigation,
} from '@react-navigation/native';
import { ProductCard, ProductType } from '../../components/types';

const gap = 10;
Config.SERVER_URL;

const ProductsSC: React.FC = () => {
    const navigation = useNavigation<CompositeNavigationProp<any, any>>();
    const [searchContainer, setSearchContainer] = useState<boolean>(false);

    const [products, setProducts] = useState<ProductType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const HANDLE = {
        loadMore: async () => {
            try {
                setIsLoading(true);
                const res = await axios(
                    `http://localhost:8080/api/vnb/v1/product/get-products?page=${page}&limit=10`
                );

                if (res?.data?.data?.length === 0) {
                    setHasMore(false);
                }

                setProducts((prevData) => [...prevData, ...res?.data?.data]);
                setIsLoading(false);
            } catch (error) {
                setHasMore(false);
            }
        },
    };

    useEffect(() => {
        HANDLE.loadMore();
    }, [page]);

    const Pending = () => {
        return isLoading ? (
            <View className='text-center'>
                <ActivityIndicator size='large' color='red' />
            </View>
        ) : null;
    };

    return (
        <SafeAreaView className='flex-1 mb-[90px]'>
            <View className='flex-row items-center justify-between gap-4 px-3'>
                <Text className=' text-2xl font-bold'>Product</Text>
                <TouchableOpacity
                    className=' h-10 w-10 flex items-center justify-center rounded-full bg-gray-300'
                    onPress={() => setSearchContainer(!searchContainer)}>
                    <FontAwesome name='search' size={25} />
                </TouchableOpacity>
            </View>
            {searchContainer && (
                <Search closeSearch={() => setSearchContainer(false)} />
            )}

            <View className='flex-row justify-end px-3 mt-4'>
                <TouchableOpacity className='px-3 py-2 bg-gray-300 rounded-[10px] flex-row'>
                    <Text className='text-sm'>Price</Text>
                    <AntDesign name='arrowdown' size={20} color='black' />
                </TouchableOpacity>
            </View>

            <View className='px-3 mt-4'>
                {products && products.length > 0 && (
                    <FlatList
                        numColumns={2}
                        contentContainerStyle={{ gap }}
                        columnWrapperStyle={{ gap }}
                        data={products}
                        renderItem={({ item }) => {
                            return (
                                <ProductItem
                                    id={item._id}
                                    name={item.name}
                                    price={item.price}
                                    image={item.image}
                                    slug={item.slug}
                                    data={item}
                                />
                            );
                        }}
                        keyExtractor={(item) => item._id}
                        ListFooterComponent={Pending}
                        onEndReached={() => {
                            if (hasMore) setPage((prevPage) => prevPage + 1);
                        }}
                        onEndReachedThreshold={0.1}
                    />
                )}
            </View>
        </SafeAreaView>
    );
};

export default ProductsSC;

const ProductItem: React.FC<ProductCard> = ({
    id,
    name,
    price,
    image,
    slug,
    data,
}) => {
    const navigation = useNavigation<CompositeNavigationProp<any, any>>();

    const numColumns = 2;
    const paddingX = 12;
    const screenWidth = Dimensions.get('window').width;
    const availableSpace = screenWidth - (numColumns - 1) * gap;
    const itemSize = availableSpace / numColumns - paddingX;

    return (
        <TouchableOpacity
            className='rounded-[10px] shadow-sm p-3 relative'
            onPress={() =>
                navigation.navigate('ProductDetails', { data: data })
            }
            style={{
                width: itemSize,
                backgroundColor: 'white',
            }}>
            <>
                <View className='pb-5'>
                    <Image
                        source={{ uri: image }}
                        className='w-full h-[300px] rounded-[10px] mix-blend-multiply'
                        resizeMode='contain'
                    />
                    <Text className='text-center text-base'>{name}</Text>
                </View>

                <Text className='text-center text-primary absolute bottom-3 right-0 left-0'>
                    {price?.toLocaleString()}₫
                </Text>
            </>
        </TouchableOpacity>
    );
};
