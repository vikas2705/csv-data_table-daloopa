import React from "react";
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

const EditModal = ({ rowData, open, handleClose, tableHeaders }) => {
    console.log({ rowData });
    console.log({ tableHeaders });

    const handleFormSubmit = e => {
        e.preventDefault();
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
                                        value={rowData[index]}
                                    />
                                </div>
                            );
                        })}

                        <div className='btn-wrapper'>
                            <input type='submit' className='submit' />
                        </div>
                    </form>
                </Typography>
            </Box>
        </Modal>
    );
};

export default EditModal;
