import React, { useState } from "react";
import { DataTable } from "./data-table";
import PageSize from "./page-size";
import Pagination from "./pagination";
import EditModal from "./edit-modal";

const DEFAULT_PAGESIZE = 10;

export const CustomDataTable = ({ dataList, customColumns, onUpdate }) => {
    const [pageSize, setpageSize] = useState(DEFAULT_PAGESIZE);
    const [pageNum, setPageNum] = useState(1);
    const [open, setOpen] = React.useState(false);
    const totalPages = Math.ceil((dataList.length - 1) / pageSize);

    const [editableData, setEditableData] = useState(null);
    const [editableIndex, setEditableIndex] = useState(null);

    if (dataList.length === 0) {
        return null;
    }

    const resetForm = () => {
        setEditableData(null);
        setEditableIndex(null);
    };

    const handleEditCell = (e, data, index) => {
        e.preventDefault();
        setEditableIndex(index);
        setEditableData(data);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        resetForm();
    };

    return (
        <div>
            <DataTable
                dataList={dataList}
                pageSize={pageSize}
                pageNum={pageNum}
                customColumns={customColumns}
                onEditCell={handleEditCell}
            />

            <div className='list-footer'>
                <PageSize pageSize={pageSize} setpageSize={setpageSize} />

                <Pagination
                    pageNum={pageNum}
                    setPageNum={setPageNum}
                    totalPages={totalPages}
                />
            </div>

            {open && (
                <EditModal
                    open={open}
                    rowData={editableData}
                    rowIndex={editableIndex}
                    handleClose={handleClose}
                    tableHeaders={dataList[0]}
                    onUpdate={onUpdate}
                />
            )}
        </div>
    );
};
