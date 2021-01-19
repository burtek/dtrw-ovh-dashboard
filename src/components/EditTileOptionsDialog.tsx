import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import type { Dispatch, SetStateAction } from 'react';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { TileData } from '../tiles';
import { findTileByType, useTileSelector } from '../tiles';

export function useEditTileOptionsDialog() {
    const [isOpen, setIsOpen] = useState(false);
    const [id, setId] = useState<null | string>(null);

    return {
        id,
        isOpen,
        open: (id: string) => {
            setId(id);
            setIsOpen(true);
        },
        close: () => setIsOpen(false)
    };
}

function EditTileOptionsDialogContent({
    tileId,
    isOpen,
    onAccept,
    onCancel
}: EditTileOptionsDialogProps) {
    const [t] = useTranslation();
    const tile = useTileSelector(tileId);
    const stateManager = useState<TileData>(tile?.data ?? {} as TileData);
    const [currentState] = stateManager;
    const onSave = useCallback(
        () => {
            onAccept(currentState)
        },
        [onAccept, currentState],
    )

    if (!tileId || !tile) {
        return null;
    }

    const OptionsComponent = findTileByType(tile.type).renderOptions;

    return (
        <Dialog
            open={isOpen}
            onClose={onCancel}
            aria-labelledby="alert-dialog-title"
        >
            <DialogTitle id="alert-dialog-title">
                {t('tiles.dialogs.edit.title')}
            </DialogTitle>
            <DialogContent>
                <OptionsComponent id={tileId} dataState={stateManager as [TileData, Dispatch<SetStateAction<TileData>>]} />
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel} color="primary">
                    {t('tiles.dialogs.edit.cancel')}
                </Button>
                <Button onClick={onSave} variant="contained" color="primary" autoFocus>
                    {t('tiles.dialogs.edit.confirm')}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default function EditTileOptionsDialog(props: EditTileOptionsDialogProps) {
    return <EditTileOptionsDialogContent {...props} key={props.tileId ?? '------dummy'} />
}

interface EditTileOptionsDialogProps {
    isOpen: boolean;
    tileId: string | null;
    onCancel(): void;
    onAccept(data: TileData): void;
}
