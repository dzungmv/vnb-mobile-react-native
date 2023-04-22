import { Entypo } from '@expo/vector-icons';
import { Dimensions, TextInput, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';

type Props = {
    closeSearch: (state: boolean) => void | undefined;
};

const Search: React.FC<Props> = ({ closeSearch }) => {
    const { height } = Dimensions.get('window');
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
        </Animatable.View>
        // </View>
    );
};

export default Search;
