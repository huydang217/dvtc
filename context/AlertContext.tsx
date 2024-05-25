import React, { createContext, useState, useContext } from "react";
import ModalAlert from "../components/Others/ModalAlert";

const AlertContext = createContext({
    showAlert: function (_message: string) {},
    hideAlert: function () {},
});

export const AlertProvider = ({ children }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const showAlert = (message) => {
        setModalMessage(message);
        setModalVisible(true);
    };

    const hideAlert = () => {
        setModalVisible(false);
        setModalMessage("");
    };

    return (
        <AlertContext.Provider value={{ showAlert, hideAlert }}>
            {children}
            <ModalAlert
            
                visible={modalVisible}
                message={modalMessage}
                onClose={hideAlert}
            />
        </AlertContext.Provider>
    );
};

export const useAlert = () => {
    return useContext(AlertContext);
};
