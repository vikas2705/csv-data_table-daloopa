import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

const EditModal = ({
    rowData,
    rowIndex,
    open,
    handleClose,
    tableHeaders,
    onUpdate,
}) => {
    const [rowDataInfo, setRowDataInfo] = useState(rowData);

    const handleFormSubmit = e => {
        e.preventDefault();
        onUpdate(rowIndex, rowDataInfo);
        handleClose();
    };

    const handleChange = (value, index) => {
        const dataCopy = [...rowDataInfo];
        dataCopy[index] = value;
        setRowDataInfo(dataCopy);
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
        >
            <Box sx={style}>
                <Typography id='modal-modal-title' variant='h6' component='h2'>
                    Edit Data
                </Typography>
                <Typography id='modal-modal-description' sx={{ mt: 2 }}>
                    <form onSubmit={handleFormSubmit}>
                        {tableHeaders.map((col, index) => {
                            return (
                                <div key={col} className='input-container'>
                                    <label for={col}>{col}: </label>
                                    <input
                                        id={col}
                                        type='text'
                                        value={rowDataInfo[index]}
                                        onChange={e => {
                                            handleChange(e.target.value, index);
                                        }}
                                    />
                                </div>
                            );
                        })}

                        <div className='btn-wrapper'>
                            <button onClick={handleClose}>Cancel</button>
                            <input type='submit' className='submit' />
                        </div>
                    </form>
                </Typography>
            </Box>
        </Modal>
    );
};

export default React.memo(EditModal);
