import { styleSheets } from "min-document";
import React, { useEffect, useState, useRef } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView, Text, TextInput, FlatList, KeyboardAvoidingView, NativeModules, ToastAndroid, LayoutAnimation, } from "react-native";
import { Icon } from "react-native-elements";
import db from "../config"

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);

export default function Search() {
    const [flexAlign, setflexAlign] = useState("flex-end");
    const ref = useRef(0);
    const [searchData, setsearchData] = useState("");
    const [flatData, setflatData] = useState([]);
    const [read, setread] = useState([]);
    const [readh, setreadh] = useState(0);
    const [readw, setreadw] = useState(0);
    const [searched, setsearched] = useState(false)
    // Animated.timing(this.state.xPosition, {
    //     toValue: 100,
    //     easing: Easing.back(),
    //     duration: 2000
    //   }).start();

    function transition() {
        LayoutAnimation.spring();
        setreadh(80);
        setreadw(80);
    }
    async function submit() {
        if (searchData) {
            setflatData([]);
            setsearched(true);
            // console.log(flatData.length = "0000000000000000000000000000000000000000000000000000000000000000000000000")
            // console.log("__________________________________________________________________")
            searchStory(searchData);
            seacrhAuthor(searchData);
            searchMoral(searchData);
            searchTitle(searchData);
            // console.log(flatData.length);
        } else {
            ref.current.blur();
            ToastAndroid.show("First Enter Something", ToastAndroid.SHORT);
        }
    }

    async function searchStory(s) {
        const databaseRef = await db.collection("userStories").where('story', '==', s).limit(10).get();
        databaseRef.docs.map((data) => {
            let mappedData = data.data();
            setflatData([...flatData, mappedData]);
        });
    }

    async function searchMoral(m) {
        const databaseRef = await db.collection("userStories").where('moral', '==', m).limit(10).get();
        databaseRef.docs.map((data) => {
            let mappedData = data.data();
            setflatData([...flatData, mappedData]);
        });
    }

    async function seacrhAuthor(a) {
        const databaseRef = await db.collection("userStories").where('author', '==', a).limit(10).get();
        databaseRef.docs.map((data) => {
            let mappedData = data.data();
            setflatData([...flatData, mappedData]);
        });
    }

    async function searchTitle(t) {
        const databaseRef = await db.collection("userStories").where('title', '==', t).limit(10).get();
        databaseRef.docs.map((data) => {
            let mappedData = data.data();
            setflatData([...flatData, mappedData]);
        });
    }

    useEffect(() => {
        // console.log(flatData.length)
    }, [])

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView style={{
                width: "100%", height: "100%", alignItems: "center", justifyContent: "center", flexDirection: "row", position: "absolute"
            }}>
                <TouchableOpacity onPress={() => { ref.current.blur(); }} style={{ width: "100%", height: "100%", position: "absolute", flexDirection: "row" }}>
                    <KeyboardAvoidingView style={{ zIndex: 5, width: "100%", height: 60, alignSelf: flexAlign, marginTop: flexAlign === "flex-start" ? 50 : 0, alignItems: "center" }}>
                        <TextInput
                            onChangeText={(v) => {
                                setsearchData(v);
                            }}
                            ref={ref}
                            selectTextOnFocus
                            blurOnSubmit
                            onBlur={() => {
                                LayoutAnimation.spring();
                                setflexAlign("flex-end");
                            }}
                            onSubmitEditing={() => { submit() }}
                            placeholder={"Search here"}
                            style={[styles.input, { marginTop: 0, zIndex: 5, elevation: 50 }]}
                            keyboardDismissMode={"on-drag"}
                            onFocus={() => { LayoutAnimation.spring(); setflexAlign("flex-start") }}
                        ></TextInput>
                    </KeyboardAvoidingView>
                </TouchableOpacity>
            </KeyboardAvoidingView>
            <View style={{ height: "80%", width: "90%", marginTop: flexAlign === "flex-start" ? ("40%") : ("5%"), marginBottom: flexAlign === "flex-end" ? ("15%") : ("0%") }}>
                <ScrollView>
                    {flatData.length === 0 && searched ? (<View style={{ width: "80%", alignSelf: "center" }}><Text style={{ alignSelf: "center", color: "#555", fontSize: 18 }}>No Results yet !</Text></View>) : (flatData.length === 0 ? (<View style={{ width: "80%", alignSelf: "center" }}><Text style={{ color: "#555", fontSize: 18, alignSelf: "center" }}>Search for your stories on basis of any values related to it</Text></View>) : (<View />))}
                    <FlatList
                        data={flatData}
                        renderItem={({ item }) => {
                            return (
                                < TouchableOpacity style={{ backgroundColor: "#000", borderRadius: 6, margin: 5, padding: 10 }} key={item.story + item.author} onPress={() => { setread(item), transition(); }}>
                                    <View style={{ flexDirection: "row" }}>
                                        <Text style={{ color: "#f00" }}>Author:{" "} </Text>
                                        <Text style={{ color: "#0f0" }}>{item.author}</Text>
                                    </View>
                                    <View style={{ flexDirection: "row" }}>
                                        <Text style={{ color: "#f00" }}>Title:{" "}</Text>
                                        <Text style={{ color: "#0f0" }}>{item.title}</Text>
                                    </View>
                                </TouchableOpacity>
                            );
                        }}
                        keyExtractor={(item, index) => { index.toString() + item.toString(); }} />
                </ScrollView>
            </View>
            <View style={{ backgroundColor: "#444", position: "absolute", width: readw.toString() + "%", height: readh.toString() + "%", borderRadius: 20, alignItems: "center", justifyContent: "center" }}>
                {readh ? (<Icon
                    raised
                    brand
                    reverse
                    reverseColor={"rgba(256,0,0,1)"}
                    name='x-circle'
                    type='feather'
                    // color='#257D00'
                    onPress={() => {
                        LayoutAnimation.spring();
                        setreadh(0);
                        setreadw(0);
                    }}
                    containerStyle={{ elevation: 2, position: "absolute", zIndex: 1, alignSelf: "center", transform: [{ translateX: 120 }, { translateY: -250 }], width: 30, height: 30, alignItems: "center", justifyContent: "center" }} />) : (<View />)}
                <Text style={{ alignSelf: "center", fontSize: 20, color: "#57a" }}>{read.title?.toUpperCase()}</Text>
                <ScrollView style={{ height: "90%", width: "90%" }} showsVerticalScrollIndicator={false}>
                    <View style={{ width: "100%", height: "100%", paddingVertical: 10 }}>
                        <Text style={{ fontSize: 15, color: "#bbb" }}>{read.story}</Text>
                        <Text style={{ fontSize: 16, color: "#0a0" }}>Moral: {read.moral}</Text>
                        <Text style={{ fontSize: 16, color: "#a00", alignSelf: "flex-end" }}>---{read.author}</Text>
                    </View>
                </ScrollView>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#242424"
    },
    input: {
        width: "95%",
        height: "100%",
        textAlign: "center",
        backgroundColor: "#999",
        borderRadius: 15,
        alignSelf: "center",
        marginBottom: 10,
        elevation: 10
    }
})