import * as React from 'react';
import Modal from '@mui/material/Modal';
import { ModalBox } from './modal';


export default function BasicModal({ children, open, handleOpen, handleClose}) {

  return (
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <ModalBox>
            { children }
        </ModalBox>
    </Modal>
  );
}
