import React, { useEffect, useState } from "react";
import { View, Button, TextInput, StyleSheet, Alert, Settings } from "react-native";

import AuthService from "../../services/Auth/AuthService";
import LoginPresentation from "./LoginPresentation";
import { useAlert } from "../../context/AlertContext";

const LoginContainer = ({ navigation }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { showAlert } = useAlert();

    const [isLoading, setLoading] = useState(true);

    const handleLogin = async () => {
        const { data, error } = await AuthService.signInWithPassword(
            username,
            password
        );
        if (error) {
            showAlert("Đăng nhập thất bại!");
        } else {
            navigation.replace("Index");
        }
    };

    useEffect(() => {
        AuthService.getUser().then((user) => {
            if (user.data) navigation.replace("Index");
            setLoading(false);
        });
    }, [isLoading]);
    if (isLoading) return <>Loading....</>;
    return (
        <LoginPresentation
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            handleLogin={handleLogin}
        />
    );
};

export default LoginContainer;
