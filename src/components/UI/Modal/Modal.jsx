import * as React from 'react';
import Modal from '@mui/material/Modal';
import { ModalBox, ModalContent } from './modal';


export default function BasicModal({ children, open, handleClose}) {

  return (
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <ModalBox>
          <ModalContent>
            { children }
          </ModalContent>
        </ModalBox>
    </Modal>
  );
}
