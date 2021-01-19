import { createSelector } from '@reduxjs/toolkit';
import sortedUniq from 'lodash/sortedUniq';
import { useCallback, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import AddButton from './components/AddButton';
import EditTileOptionsDialog, {
    useEditTileOptionsDialog
} from './components/EditTileOptionsDialog';
import RemoveTileDialog, {
    useRemoveTileDialog
} from './components/RemoveTileDialog';
import Tile from './components/Tile';
import type { AppState } from './data';
import { editTile, removeTile } from './data/tiles';
import styles from './styles/index.module.scss';
import { TileData, tiles } from './tiles';

const selectIds = (state: AppState) => state.tiles.ids as string[];
const selectTypes = (state: AppState) =>
    state.tiles.ids.map(
        id => {
            const entity = state.tiles.entities[id];
            return entity?.type as string | undefined
        }
    );

const isString = (t?: string): t is string => typeof t === 'string';
const isUnknown = (t: string) => tiles.every(tile => tile.type !== t);

const selectUnknownTypes = createSelector(selectTypes, types =>
    sortedUniq(types.filter(isString).sort()).filter(isUnknown)
);
const useUnknownTypesOnce = () => {
    return useSelector(selectUnknownTypes, () => true);
};

export default function App() {
    const tileList = useSelector(selectIds, shallowEqual);
    const unknownTypes = useUnknownTypesOnce();
    const {
        id: removeTileId,
        isOpen: isRemoveDialogOpen,
        open: openRemoveDialog,
        close: closeRemoveDialog,
        name: removeTileNAme
    } = useRemoveTileDialog();
    const {
        id: editTileId,
        isOpen: isEditDialogOpen,
        open: openEditDialog,
        close: closeEditDialog
    } = useEditTileOptionsDialog();

    const [t] = useTranslation();

    const dispatch = useDispatch();
    const onAcceptRemove = useCallback(() => {
        closeRemoveDialog();
        if (removeTileId) {
            dispatch(removeTile(removeTileId));
        }
    }, [dispatch, closeRemoveDialog, removeTileId]);
    const onAcceptEdit = useCallback(
        (data: TileData) => {
            closeEditDialog();
            if (editTileId) {
                dispatch(editTile(editTileId, data));
            }
        },
        [dispatch, closeEditDialog, editTileId]
    );

    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        unknownTypes.forEach(type => {
            toast.error(t<string, string>('error.tileTypeNotFound', { type }), { duration: 8000 });
        });
    }, []);
    /* eslint-enable react-hooks/exhaustive-deps */

    return (
        <div className={styles.dashboard}>
            {tileList.map(id => (
                <Tile
                    id={id}
                    key={id}
                    onRemove={openRemoveDialog}
                    onEdit={openEditDialog}
                />
            ))}
            <AddButton />
            <RemoveTileDialog
                isOpen={isRemoveDialogOpen}
                name={removeTileNAme}
                onCancel={closeRemoveDialog}
                onAccept={onAcceptRemove}
            />
            <EditTileOptionsDialog
                tileId={editTileId}
                isOpen={isEditDialogOpen}
                onCancel={closeEditDialog}
                onAccept={onAcceptEdit}
            />
            <Toaster position="top-right" reverseOrder />
        </div>
    );
}
