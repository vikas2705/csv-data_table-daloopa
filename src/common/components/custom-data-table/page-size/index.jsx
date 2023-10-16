import React from "react";

const PageSize = ({ pageSize, setpageSize }) => {
    return (
        <select
            value={pageSize}
            onChange={e => {
                setpageSize(e.target.value);
            }}
        >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
        </select>
    );
};

export default PageSize;
