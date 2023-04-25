import {
    CompositeNavigationProp,
    useNavigation,
} from '@react-navigation/native';
import {
    Dimensions,
    Image,
    ScrollView,
    TouchableHighlight,
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
        <ScrollView
            horizontal={true}
            contentContainerStyle={{
                paddingHorizontal: 10,
                paddingVertical: 10,
            }}>
            {catalogs.map((catalog: CatalogCmpProps) => {
                return (
                    <TouchableHighlight
                        className=' rounded-[10px]  mr-2'
                        key={catalog.id}
                        style={{
                            width: width / 3 - 25,
                            height: 100,
                        }}
                        onPress={() =>
                            navigation.navigate('Products', {
                                screen: catalog?.href,
                            })
                        }>
                        <Image
                            source={{
                                uri: catalog.imageSrc,
                            }}
                            className='w-full h-full object-cover rounded-[10px]'
                        />
                    </TouchableHighlight>
                );
            })}
        </ScrollView>
    );
};

export default CatalogCmp;
