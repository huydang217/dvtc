import { HanziSearchSuggestResponse } from "../../types/Chinese/ChineseSearch";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

class HanziSearch {
    private static baseUrl: string = "https://api.hanzii.net/api/suggest";

    private getErrorMessage(axiosError: AxiosError): string {
        const error = {
          message: `Lỗi khi yêu cầu gợi ý: ${axiosError.message}`,
          statusCode: axiosError.response?.status,
          data: axiosError.response?.data,
        };
      
        return `
          Lỗi: ${error.message}
          Mã trạng thái: ${error.statusCode || 'Không xác định'}
          Dữ liệu: ${error.data || 'Không có dữ liệu'}
        `;
      }


    /**
     * Get suggestions from the Hanzii API based on the input text
     * @param text The text to get suggestions for
     * @returns Suggestions retrieved from the Hanzii API
     */
    async suggest(text: string): Promise<HanziSearchSuggestResponse> {
        const requestData = {
            keyword: text,
            dict: "cnvi",
        };
        const config: AxiosRequestConfig = {
            method: "post",
            url: HanziSearch.baseUrl,
            data: requestData,
            headers: {
                Accept: "application/json, text/plain, */*",
                "Accept-Encoding": "gzip, deflate, br",
                "Accept-Language":
                    "en-US,en;q=0.9,vi;q=08,zh-CN;q=0.7,zh;q=0.6",
                "Content-Length": 31, // Assuming the request body length is 31 (adjust if needed)
                "Content-Type": "application/json",
                Origin: "https://hanzii.net",
                Referer: "https://hanzii.net/",
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
            },
        };

        try {
            const response: {
                data: {
                    data: string[];
                };
            } = await axios(config);
            // Handle successful response (expected to be an array of suggestions)
            let matchSuggest: any[] = [];
            let notMatch: any[] = [];
            response.data.data.forEach((item) => {
                const arr = item.split("#");
                if (arr.length > 1) {
                    const keySearch = {
                        hanzi: arr[0],
                        pinyin: arr.length > 2 ? arr[2] : "",
                        mean: arr.length > 2 ? arr[3] : "",
                    };
                    if (keySearch.hanzi === text || keySearch.pinyin === text) {
                        matchSuggest.push(keySearch);
                    } else {
                        notMatch.push(keySearch);
                    }
                }
            });
            matchSuggest.sort(function (a, b) {
                return b.mean.length - a.mean.length;
            });
            notMatch.sort(function (a, b) {
                return b.mean.length - a.mean.length;
            });

            let res: HanziSearchSuggestResponse = {
                data: matchSuggest.concat(notMatch),
                error: null,
                status: 200,
            };
            return res;
        } catch (error) {
            let _error = null;
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                _error = this.getErrorMessage(axiosError);
            } else {
                _error = "Unexpected error:" + error + "\n";
            }

            // Return an empty array or throw an error based on your application logic
            let res: HanziSearchSuggestResponse = {
                data: [],
                error: _error,
                status: 404,
            };

            return res;
        }
    }
}

export default HanziSearch;
