import React, { useEffect } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";

import IndexPresentation from "./IndexPresentation";
import AuthService from "../../services/Auth/AuthService";

const IndexContainer = ({ navigation }) => {
    useEffect(() => {
        AuthService.getUser().then((user) => {
            if (user.error) navigation.replace("Login");
        });
    }, []);

    const handleLogout = () => {
        AuthService.signOut().then(() => {
            navigation.replace("Login");
        });
    };

    const handleNavigateToChineseSearch = () => {
        AuthService.getUser().then((user) => {
            if (user.error) {
                navigation.replace("Login");
                Alert.alert("You do not have access to this page");
            } else navigation.navigate("ChineseSearch");
        });
    };

    return (
        <IndexPresentation
            handleLogout={handleLogout}
            handleNavigateToChineseSearch={handleNavigateToChineseSearch}
        />
    );
};

export default IndexContainer;
