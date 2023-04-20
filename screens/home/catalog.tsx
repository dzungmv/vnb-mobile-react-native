import {
    CompositeNavigationProp,
    useNavigation,
} from '@react-navigation/native';
import {
    Dimensions,
    Image,
    Text,
    TouchableHighlight,
    View,
} from 'react-native';

import catalogs from './../../components/ui-data/catalog.json';

type CatalogCmpProps = {
    id: number;
    name?: string;
    href: string;
    imageSrc: string;
};

const CatalogCmp: React.FC = () => {
    const navigation = useNavigation<CompositeNavigationProp<any, any>>();
    const width = Dimensions.get('window').width;

    return (
        <View className='px-5 flex-row items-center gap-4 flex-wrap justify-center'>
            {catalogs.map((catalog: CatalogCmpProps) => {
                return (
                    <TouchableHighlight
                        key={catalog.id}
                        style={{
                            width: width / 3 - 25,
                            height: 100,
                        }}
                        onPress={() => navigation.navigate(catalog.href)}>
                        <Image
                            source={{
                                uri: catalog.imageSrc,
                            }}
                            className='w-full h-full object-cover rounded-[10px]'
                        />
                    </TouchableHighlight>
                );
            })}
        </View>
    );
};

export default CatalogCmp;
