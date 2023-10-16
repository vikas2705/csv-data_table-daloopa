import "./styles.css";
import Papa from "papaparse";
import { fetchCsv } from "./common/utils/fetchCsv";
import { useCallback, useEffect, useState } from "react";
import CustomDataTable from "./common/components/custom-data-table/index";

export default function App() {
    const [dataList, setDataList] = useState([]);

    async function getData() {
        const data = Papa.parse(await fetchCsv());
        const { data: csvdata } = data;
        if (csvdata && csvdata.length) {
            setDataList(csvdata);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    const handleDataUpdate = useCallback(
        (rowIndex, updatedData) => {
            const dataListCopy = [...dataList];
            dataListCopy[rowIndex + 1] = updatedData;
            setDataList(dataListCopy);
        },
        [dataList, setDataList]
    );

    /* Below are just some configuration I have tested for the CustomDataTable. The parent can create any custom config and cell can render it **/
    const customCell = item => {
        return <div className='my-custom-style'>{item}</div>;
    };

    const customCell2 = item => {
        return <div className='my-custom-style2'>{item}</div>;
    };

    const customColumns = [
        {
            displayName: "ACT Symbol",
            customRender: customCell,
        },
        {
            displayName: "Name of the company",
            customRender: customCell,
        },
        {
            displayName: "Name of the Security",
            customRender: customCell,
        },
        {
            displayName: "Exchange",
            customRender: customCell2,
        },
        {
            displayName: "CQS Symbol",
        },
        {
            displayName: "ETF",
        },
        {
            displayName: "Round Lot Size",
        },
        {
            displayName: "Test Issue",
        },
        {
            displayName: "NASDAQ Symbol",
        },
    ];

    return (
        <div className='App'>
            <CustomDataTable
                dataList={dataList}
                customColumns={customColumns}
                onUpdate={handleDataUpdate}
            />
        </div>
    );
}

/**
 * 1. reading csv and getting data
 * 2. store the csv data somewhere
 * 3. redux/jotai, state, context
 * 4. render this data table
 *  --- header -- columns
 *  --- body - rows/colums
 *  --- each cell can be customised
 * --- each cell can be edited
 *  --- page size
 * -- pagination
 *
 *
 *  performance
 * security
 * accessibility
 */
