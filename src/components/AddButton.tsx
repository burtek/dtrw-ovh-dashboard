import Fab from '@material-ui/core/Fab';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import { useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addTile } from '../data/tiles';
import { Tile, tiles, TileType } from '../tiles';
import { useBoolean } from '../utils/useBoolean';

const useStyles = makeStyles(theme =>
    createStyles({
        fab: {
            position: 'absolute',
            bottom: theme.spacing(2),
            right: theme.spacing(2),
        },
    })
);

export default function AddButton() {
    const classes = useStyles();
    const fabRef = useRef(null);
    const [isOpen, onOpen, onClose] = useBoolean(false);

    const dispatch = useDispatch();
    const onSelectItem = useCallback(
        (type: TileType) => {
            dispatch(addTile(type));
            onClose();
        },
        [dispatch, onClose]
    );

    function mapMenuItem(tile: Tile) {
        return (
            <MenuItem onClick={() => onSelectItem(tile.type)} key={tile.type}>
                {tile.name}
            </MenuItem>
        );
    }

    return (
        <>
            <Menu
                id="menu"
                anchorEl={fabRef.current}
                keepMounted
                open={isOpen}
                onClose={onClose}
                elevation={2}
                anchorOrigin={{
                    horizontal: 'right',
                    vertical: 'top',
                }}
                transformOrigin={{
                    horizontal: 'right',
                    vertical: 'bottom',
                }}
            >
                {tiles.map(mapMenuItem)}
            </Menu>
            <Fab
                className={classes.fab}
                color="primary"
                aria-label="add"
                ref={fabRef}
                onClick={onOpen}
            >
                <AddIcon />
            </Fab>
        </>
    );
}
