import React from "react";

const Pagination = ({ pageNum, setPageNum, totalPages }) => {
    return (
        <div className='pagination-wrapper'>
            <div
                className='pagination-item'
                onClick={() => {
                    setPageNum(1);
                }}
            >
                {"<<"}
            </div>
            <div
                className='pagination-item'
                onClick={() => {
                    setPageNum(pageNum - 1);
                }}
            >
                {"<"}
            </div>
            <div className='pagination-item'>{pageNum}</div>
            <div
                className='pagination-item'
                onClick={() => {
                    setPageNum(pageNum + 1);
                }}
            >
                {">"}
            </div>
            <div
                className='pagination-item'
                onClick={() => {
                    setPageNum(totalPages);
                }}
            >
                {">>"}
            </div>
        </div>
    );
};

export default React.memo(Pagination);
