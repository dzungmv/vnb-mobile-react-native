import { Entypo } from '@expo/vector-icons';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Dimensions,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import useDebounce from '../hooks/useDebounce';
import { ProductType } from '../types';
import {
    CompositeNavigationProp,
    useNavigation,
} from '@react-navigation/native';
import { isPending } from '@reduxjs/toolkit';
import NotFound from '../common/not-found';

type Props = {
    closeSearch: (state: boolean) => void | undefined;
};

const Search: React.FC<Props> = ({ closeSearch }) => {
    const navigation = useNavigation<CompositeNavigationProp<any, any>>();
    const { height } = Dimensions.get('window');
    const [searchValue, setSearchValue] = useState<string>('');

    const searchDeb = useDebounce(searchValue, 800);

    const [searchPending, setSearchPending] = useState<boolean>(false);

    const [searchResult, setSearchResult] = useState<ProductType[]>([]);

    useEffect(() => {
        if (!searchDeb) return;
        (async () => {
            try {
                setSearchPending(true);
                const res = await axios.post(
                    `http://localhost:8080/api/vnb/v1/product/search-products`,
                    {
                        keyword: searchDeb,
                    }
                );

                setSearchResult(res.data.data);

                setSearchPending(false);
            } catch (error: any) {
                setSearchPending(false);
            }
        })();
    }, [searchDeb]);

    useEffect(() => {
        if (!searchValue) {
            setSearchResult([]);
        }
    }, [searchValue]);

    return (
        <Animatable.View
            animation='slideInRight'
            easing='ease-out-cubic'
            duration={200}
            style={{
                height: height,
            }}
            className='flex-1 bg-white absolute top-0 left-0 right-0 bottom-0 px-5 z-50 pt-16'>
            <View className='flex-row items-center gap-2'>
                <TouchableOpacity onPress={() => closeSearch(false)}>
                    <Entypo name='chevron-thin-left' size={25} />
                </TouchableOpacity>
                <TextInput
                    placeholder='Search VNBSHOP'
                    clearButtonMode='always'
                    autoCapitalize='none'
                    onChangeText={(text) => setSearchValue(text)}
                    style={{
                        flex: 1,
                        height: 40,
                        backgroundColor: '#f2f2f2',
                        borderRadius: 55,
                        textAlignVertical: 'center',
                        paddingLeft: 20,
                        paddingRight: 20,
                        fontSize: 16,
                    }}
                />
            </View>

            {searchPending ? (
                <View className='mt-5'>
                    <ActivityIndicator color='#FF2461' />
                </View>
            ) : searchResult && searchResult.length > 0 ? (
                <View className='mt-5 pr-5'>
                    {searchResult?.map((item: ProductType) => {
                        return (
                            <TouchableOpacity
                                key={item?._id}
                                className='flex-row items-center px-1 py-2 mb-1'
                                onPress={() =>
                                    navigation.navigate('Products', {
                                        screen: 'ProductDetails',
                                        params: {
                                            data: item,
                                        },
                                    })
                                }>
                                <View className='flex-row items-center'>
                                    <Image
                                        source={{ uri: item?.image }}
                                        style={{ width: 70, height: 70 }}
                                        resizeMode='contain'
                                    />
                                    <View className='flex-1 ml-2'>
                                        <Text className='text-lg font-medium'>
                                            {item?.name}
                                        </Text>
                                        <Text className='text-base text-primary'>
                                            {item?.price?.toLocaleString()}
                                        </Text>
                                    </View>
                                </View>

                                <AntDesign
                                    name='arrowright'
                                    size={24}
                                    color='gray'
                                />
                            </TouchableOpacity>
                        );
                    })}
                </View>
            ) : (
                <NotFound title='Search something...' />
            )}
        </Animatable.View>
        // </View>
    );
};

export default Search;
