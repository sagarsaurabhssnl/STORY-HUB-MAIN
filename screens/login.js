import React, { useState, useEffect } from "react";
import { StyleSheet, KeyboardAvoidingView, TouchableOpacity, ToastAndroid, Vibration, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import firebase from 'firebase';

export default function Login({ navigation }) {
    const [username, setusername] = useState("test@test.com");
    const [password, setpassword] = useState("test12");


    function dataCheck() {
        if (username && password) {
            login();
        } else {
            if (!username && !password) {
                ToastAndroid.showWithGravityAndOffset(
                    "Username and password cannot be empty",
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );
                Vibration.vibrate();
            } else if (!username) {
                ToastAndroid.showWithGravityAndOffset(
                    "Username cannot be empty.",
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );
                Vibration.vibrate();
            } else if (!password) {
                ToastAndroid.showWithGravityAndOffset(
                    "Password cannot be empty.",
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );
                Vibration.vibrate();
            }
        }
    }

    async function login() {
        console.log("login called")
        try {
            const response = await firebase.auth().signInWithEmailAndPassword(username, password);
            console.log(response);
            if (response) {
                ToastAndroid.showWithGravityAndOffset(
                    "Log in Success !",
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );
                Vibration.vibrate();
                setTimeout(() => {
                    navigation.replace('HOME', { screen: 'Write' });
                }, 100);
            }
        } catch (error) {
            console.log(error.code)
            switch (error.code) {
                case "auth/user-not-found":
                    Vibration.vibrate();
                    ToastAndroid.showWithGravityAndOffset(
                        "User doesn't exist",
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM,
                        25,
                        50
                    );
                    break;
                case "auth/invalid-email":
                    Vibration.vibrate();
                    ToastAndroid.showWithGravityAndOffset(
                        "User doesn't exist",
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM,
                        25,
                        50
                    );
                    break;
                case "auth/wrong-password":
                    Vibration.vibrate();
                    ToastAndroid.showWithGravityAndOffset(
                        "Wrong Password",
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM,
                        25,
                        50
                    );
                    break;
            }
        }

    }

    return (
        <KeyboardAvoidingView style={{ alignItems: "center", justifyContent: "center", backgroundColor: "#242424", width: "100%", height: "100%" }}>
            <TextInput style={styles.input} placeholder={"Username"} value={username} onChangeText={(val) => { setusername(val) }} maxLength={50} />
            <TextInput style={styles.input} placeholder={"Password"} value={password} onChangeText={(val) => { setpassword(val) }} maxLength={20} secureTextEntry={true} />
            <TouchableOpacity
                onPress={() => {
                    dataCheck();
                }}
                style={{ width: "30%", height: 50, backgroundColor: "#287", borderRadius: 6, alignItems: "center", justifyContent: "center" }}>
                <Text>
                    LOGIN
                </Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    input: {
        width: "80%",
        height: 50,
        backgroundColor: "#ddd",
        margin: 20,
        borderRadius: 6,
        textAlign: "center"
    }
})