export type HanziSearchSuggestResponse = {
    status: number; // The text to get suggestions for,
    error: any | null;
    data: {
        hanzi: string;
        mean: string;
        pinyin: string;
    }[];
}
