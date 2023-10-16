export const fetchCsv = async () => {
    const response = await fetch(
        "https://pkgstore.datahub.io/core/nyse-other-listings/other-listed_csv/data/9f38660d84fe6ba786a4444b815b3b80/other-listed_csv.csv"
    );
    const reader = response.body.getReader();
    const result = await reader.read();
    const decoder = new TextDecoder("utf-8");
    const csv = await decoder.decode(result.value);
    return csv;
};
