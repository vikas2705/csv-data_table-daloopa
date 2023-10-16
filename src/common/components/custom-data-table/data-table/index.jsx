import React from "react";

export const DataTable = ({
    dataList,
    pageSize,
    pageNum,
    customColumns,
    onEditCell,
}) => {
    if (dataList.length === 0) {
        return null;
    }

    const tableHeaders = dataList[0];
    const csvTableData = [...dataList];
    csvTableData.splice(0, 1);
    const tableData = csvTableData;

    const totalData = [...tableData];

    const itemsOnPage = dataList.length - (pageNum - 1) * pageSize;
    const maxPageCount = Math.min(itemsOnPage, pageSize);
    const dataToShow = totalData.splice((pageNum - 1) * pageSize, maxPageCount);

    return (
        <div className='table-wrapper'>
            <table>
                <tr>
                    {tableHeaders.map((col, index) => {
                        if (customColumns[index]) {
                            return (
                                <th key={col[0]}>
                                    {customColumns[index].displayName}
                                </th>
                            );
                        }
                        return <th key={col[0]}>{col}</th>;
                    })}

                    <th>Actions</th>
                </tr>

                {dataToShow.map((data, rowIndex) => {
                    if (!data || data.length <= 1) {
                        return null;
                    }
                    return (
                        <tr key={`${data[0]}-${rowIndex}`}>
                            {data.map((col, index) => {
                                if (
                                    customColumns[index] &&
                                    customColumns[index].customRender
                                ) {
                                    return (
                                        <td key={col[0]}>
                                            {customColumns[index].customRender(
                                                col
                                            )}
                                        </td>
                                    );
                                }
                                return <td key={col[0]}>{col}</td>;
                            })}
                            <td>
                                <button
                                    onClick={e => {
                                        onEditCell(e, data, rowIndex);
                                    }}
                                >
                                    Edit
                                </button>
                            </td>
                        </tr>
                    );
                })}
            </table>
        </div>
    );
};
