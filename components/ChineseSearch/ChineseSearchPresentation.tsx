import React from "react";
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    FlatList,
    SafeAreaView,
    StatusBar,
} from "react-native";

const ChineseSearchPresentation = ({
    searchTerm,
    setSearchTerm,
    handleSearch,
    results,
}: {
    searchTerm: string;
    setSearchTerm: any;
    handleSearch: any;
    results: {
        hanzi: string;
        mean: string;
        pinyin: string;
    }[];
}) => {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Chinese Search</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter search term"
                value={searchTerm}
                onChangeText={setSearchTerm}
            />
            <Button
                title="Search"
                onPress={() => {
                    handleSearch(searchTerm);
                }}
                color="#6200EE"
            />
            <FlatList
                data={results}
           
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.resultCard}>
                        <Text style={styles.resultTerm}>{item.hanzi}</Text>
                        <Text style={styles.resultMeaning}>{`${item.pinyin} | ${item.mean}`}</Text>
                    </View>
                )}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        padding: 16,
        backgroundColor: "#F5F5F5",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: "#6200EE",
        borderWidth: 1,
        paddingHorizontal: 8,
        marginBottom: 10,
        borderRadius: 4,
        backgroundColor: "#FFF",
    },
    resultCard: {
        backgroundColor: "#FFF",
        padding: 10,
        marginVertical: 5,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    resultTerm: {
        fontSize: 18,
        fontWeight: "bold",
    },
    resultMeaning: {
        fontSize: 16,
        color: "#666",
    },
});

export default ChineseSearchPresentation;
