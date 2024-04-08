import { FlatList } from 'react-native';
import CategoryGridTile from '../components/CategoryGridTile';

import { CATEGORIES } from '../data/dummy-data'

function renderCategoryItem(item) {
    return (<CategoryGridTile title={item.item.title} color={item.item.color} />)
}

function CategoriesScreen() {
    return <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item.id}
        renderItem={renderCategoryItem}
        numColumns={2}
    />
}

export default CategoriesScreen;