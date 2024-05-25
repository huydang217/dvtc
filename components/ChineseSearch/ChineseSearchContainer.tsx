import React, { useEffect, useState } from "react";
import ChineseSearchPresentation from "./ChineseSearchPresentation";
import AuthService from "../../services/Auth/AuthService";
import HanziSearch from "../../services/Chinese/HanziSearch";
import { useAlert } from "../../context/AlertContext";

const ChineseSearchContainer = ({ navigation }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState<
        {
            hanzi: string;
            mean: string;
            pinyin: string;
        }[]
    >([]);
    const { showAlert } = useAlert();
    const mHanziSearch = new HanziSearch();

    useEffect(() => {
        AuthService.getUser().then((user) => {
            if (user.error) navigation.replace("Login");
        });
    }, []);

    const handleSearch = async (q: string) => {
        // Thực hiện tìm kiếm giả lập
        const { data, error, status } = await mHanziSearch.suggest(q);
        if (error) showAlert(error);
        else {
            setResults(data);
        }
    };

    return (
        <ChineseSearchPresentation
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleSearch={handleSearch}
            results={results}
        />
    );
};

export default ChineseSearchContainer;
