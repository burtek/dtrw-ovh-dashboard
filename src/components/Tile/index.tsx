import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import classNames from 'classnames';
import { useCallback, useMemo } from 'react';
import Draggable, { DraggableEventHandler } from 'react-draggable';
import { useDispatch } from 'react-redux';
import { ResizableBox, ResizableProps } from 'react-resizable';
import { moveTile } from '../../data/tiles';
import { tiles, useTileSelector } from '../../tiles';
import styles from './styles.module.scss';

function useCallbacks(id: string) {
    const dispatch = useDispatch();
    const onStopDrag = useCallback<DraggableEventHandler>(
        (event, { x, y }) => {
            dispatch(moveTile(id, { x, y }));
        },
        [dispatch, id]
    );
    const onResizeStop = useCallback<
        ResizableProps['onResizeStop'] extends undefined | infer R ? R : never
    >(
        (event, { size: { width, height } }) => {
            dispatch(moveTile(id, { width, height }));
        },
        [dispatch, id]
    );

    return {
        onStopDrag,
        onResizeStop
    };
}

export default function Tile({ id, onRemove }: TileProps) {
    const tile = useTileSelector(id);

    const { onStopDrag, onResizeStop } = useCallbacks(tile.id);

    const { render: TileContent, name: tileName } = useMemo(
        () => tiles.find(knownTile => knownTile.type === tile.type)!,
        [tile.type]
    );

    const { x, y, width, height } = tile;
    const handleClassName = `handle-${tile.id}`;

    return (
        <Draggable
            defaultPosition={{ x, y }}
            onStop={onStopDrag}
            handle={`.${handleClassName}`}
        >
            <ResizableBox
                width={width}
                height={height}
                onResizeStop={onResizeStop}
                className={styles.geometry}
                minConstraints={[150, 150]}
            >
                <Paper className={styles.paper} elevation={3}>
                    <div className={styles.paperHeader}>
                        <div
                            className={classNames(
                                styles.paperTitle,
                                handleClassName
                            )}
                        >
                            {tileName}
                        </div>
                        <div>
                            <IconButton
                                aria-label="edit"
                                className={styles.paperHeaderButton}
                                color="primary"
                                disabled
                            >
                                <EditIcon />
                            </IconButton>
                            <IconButton
                                aria-label="remove"
                                className={styles.paperHeaderButton}
                                size="small"
                                color="secondary"
                                onClick={() => onRemove(id)}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </div>
                    </div>
                    <hr />
                    <div className={styles.paperContent}>
                        <TileContent id={id} data={tile.data} />
                    </div>
                </Paper>
            </ResizableBox>
        </Draggable>
    );
}

interface TileProps {
    id: string;
    onRemove: (id: string) => void;
}
