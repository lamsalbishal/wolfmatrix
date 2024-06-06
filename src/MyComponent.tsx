

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Text, View, TouchableOpacity, FlatList, TextInput, StyleSheet } from 'react-native';
import SearchListItem from './Interfaces'

interface Props {
    data: SearchListItem[]
}
const MyComponent: React.FC<Props> = ({ data }) => {
    const [dataSource, setDataSource] = useState<SearchListItem[]>(data);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const inputRef = useRef<any>(null);
    const timeoutId = useRef<any>(null);

    const handleSearch = (e: string) => {
        setSearchTerm(e);
    };

    const searchText = useCallback((e: string) => {
        if (timeoutId.current) {
            clearTimeout(timeoutId.current);
        }
        timeoutId.current = setTimeout(() => {
            setDataSource(data.filter((item: SearchListItem) => item.name.toLowerCase().includes(e.toLowerCase())));
        }, 1000);
    }, []);

    useEffect(() => {
        searchText(searchTerm);
    }, [searchTerm, searchText]);

    const onSearchChange = (e: string) => {
        handleSearch(e);
    };


    const handleClear = () => {
        inputRef.current.clear();
        setDataSource(data)
    }

    const handleSelect = (id: string) => {
        setDataSource(prevData =>
            prevData.map(item =>
                item.id === id ? item?.status ? { ...item, status: false } : { ...item, status: true } : item
            )
        );

    };

    return (
        <View style={style.searchContainer}>
            <View style={style.searchWrapBox}>
                <TextInput
                    style={style.searchTextInput}
                    ref={inputRef}
                    onChangeText={onSearchChange}
                    value={searchTerm}
                    testID="search-input"
                />
                <TouchableOpacity onPress={handleClear}>
                    <Text>Clear</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={dataSource}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleSelect(item?.id)}>
                        <View style={style.listWrapBox}>
                            <Text testID={`item-${item.name}`} style={style.titleStyle} >{item.name}</Text>
                            <Text>{item.status ? 'Selected' : 'Not selected'}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

export default MyComponent

const style = StyleSheet.create({
    searchContainer: {
        padding: 10
    },
    searchWrapBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    searchTextInput: {
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#000000",
        width: '85%'
    },
    listWrapBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 8

    },
    titleStyle: {
        fontSize: 20,
        color: "#000000"
    }
})