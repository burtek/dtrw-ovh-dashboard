import { useCallback } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import AddButton from './components/AddButton';
import RemoveTileDialog, { useRemoveTileDialog } from './components/RemoveTileDialog';
import Tile from './components/Tile';
import type { AppState } from './data';
import { removeTile } from './data/tiles';
import styles from './styles/index.module.scss';

const selectIds = (state: AppState) => state.tiles.ids as string[]

export default function App() {
    const tileList = useSelector(selectIds, shallowEqual);
    const { id, isOpen, open, close, name } = useRemoveTileDialog();

    const dispatch = useDispatch();
    const onAccept = useCallback(() => {
        close();
        if (id) {
            dispatch(removeTile(id));
        }
    }, [dispatch, close, id]);

    return (
        <div className={styles.dashboard}>
            {tileList.map(id => <Tile id={id} key={id} onRemove={open} />)}
            <AddButton />
            <RemoveTileDialog isOpen={isOpen} name={name} onCancel={close} onAccept={onAccept} />
        </div>
    );
}
