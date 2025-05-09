'use client';
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { FunctionComponent } from 'react';

const Transition = (
  props: TransitionProps & {
    children: React.ReactElement<unknown, 'dialog'>;
  },
  ref: React.Ref<unknown>
) => {
  return <Slide direction="up" ref={ref} {...props} />;
};

type ModalProps = {
  open: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  hasCloseIcon?: boolean;
  title?: string;
  actionBox?: React.ReactNode;
};
export default function Modal({
  open,
  onClose,
  children,
  hasCloseIcon = true,
  title,
  actionBox,
}: ModalProps) {
  return (
    <>
      <Dialog open={open} onClose={onClose} slots={{ transition: Transition as FunctionComponent }}>
        {title && (
          <DialogTitle
            sx={{
              m: 0,
              px: 1.5,
              py: 2,
              borderBottom: '1px #E0E0E0 solid',
              fontSize: 16,
              fontWeight: 500,
            }}
          >
            {title}
          </DialogTitle>
        )}
        {hasCloseIcon && (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={theme => ({
              position: 'absolute',
              right: 0,
              top: 8,
              color: theme.palette.grey[500],
            })}
          >
            <CloseIcon />
          </IconButton>
        )}
        <DialogContent sx={{ width: 1, px: 1.5 }}>{children}</DialogContent>
        {Boolean(actionBox) && (
          <DialogActions sx={{ boxShadow: '0px 3px 15px 3px rgba(34, 34, 34, 0.1)', p: 1.25 }}>
            {actionBox}
          </DialogActions>
        )}
      </Dialog>
    </>
  );
}
