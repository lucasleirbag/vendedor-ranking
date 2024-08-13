// src/components/ConfirmDeleteModal.js
import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

function ConfirmDeleteModal({ open, onClose, onConfirm }) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="confirm-delete-dialog-title"
            aria-describedby="confirm-delete-dialog-description"
        >
            <DialogTitle id="confirm-delete-dialog-title">Confirmar Exclusão</DialogTitle>
            <DialogContent>
                <DialogContentText id="confirm-delete-dialog-description">
                    Você tem certeza que deseja excluir este vendedor? Esta ação não pode ser desfeita.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancelar
                </Button>
                <Button onClick={onConfirm} color="secondary" autoFocus>
                    Excluir
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ConfirmDeleteModal;
