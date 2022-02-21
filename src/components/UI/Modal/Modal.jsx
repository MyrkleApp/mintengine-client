import * as React from 'react';
import MuiModal from '@mui/material/Modal';
import { ModalBox, ModalContent } from './modal';


export default function Modal({ children, open, handleClose }) {

  return (
    <MuiModal
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
    </MuiModal>
  );
}
