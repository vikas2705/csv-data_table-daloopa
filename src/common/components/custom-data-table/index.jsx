import React, { useCallback, useState } from "react";
import DataTable from "./data-table";
import PageSize from "./page-size";
import Pagination from "./pagination";
import EditModal from "./edit-modal";

const DEFAULT_PAGESIZE = 10;

const CustomDataTable = ({ dataList, customColumns, onUpdate }) => {
    const [pageSize, setpageSize] = useState(DEFAULT_PAGESIZE);
    const [pageNum, setPageNum] = useState(1);
    const [open, setOpen] = React.useState(false);

    const [editableData, setEditableData] = useState(null);
    const [editableIndex, setEditableIndex] = useState(null);

    const totalPages = Math.ceil((dataList.length - 1) / pageSize);

    const resetForm = useCallback(() => {
        setEditableData(null);
        setEditableIndex(null);
    }, [setEditableData, setEditableIndex]);

    const handleEditCell = useCallback(
        (e, data, index) => {
            e.preventDefault();
            setEditableIndex(index);
            setEditableData(data);
            setOpen(true);
        },
        [setEditableData, setEditableIndex, setOpen]
    );

    const handleClose = useCallback(() => {
        setOpen(false);
        resetForm();
    }, [setOpen, resetForm]);

    if (dataList.length === 0) {
        return null;
    }

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

export default React.memo(CustomDataTable);
