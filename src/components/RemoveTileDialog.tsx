import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { findTileByType, useTileSelector } from '../tiles';

export function useRememberLast(value: null | string) {
    const ref = useRef<string | null>(null);
    if (value !== null && ref.current !== value) {
        ref.current = value;
    }
    return ref.current;
}

export function useRemoveTileDialog() {
    const [id, setId] = useState<null | string>(null);
    const tile = useTileSelector(id);
    const name = useRememberLast(tile && findTileByType(tile.type).name) ?? '';

    return {
        id,
        isOpen: tile !== null,
        open: (id: string) => setId(id),
        close: () => setId(null),
        name
    };
}

export default function RemoveTileDialog({
    isOpen,
    name,
    onAccept,
    onCancel
}: RemoveTileDialogProps) {
    const [t] = useTranslation();

    return (
        <Dialog
            open={isOpen}
            onClose={onCancel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {t('tiles.alerts.remove.title')}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {t('tiles.alerts.remove.description', { name })}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel} color="primary">
                    {t('tiles.alerts.remove.cancel')}
                </Button>
                <Button onClick={onAccept} color="secondary" autoFocus>
                    {t('tiles.alerts.remove.confirm')}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

interface RemoveTileDialogProps {
    isOpen: boolean;
    name: string;
    onCancel(): void;
    onAccept(): void;
}
