import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import { createTileType } from '../Tile';
import { useSubState } from '../useSubState';

export const dummyTile = createTileType(
    'DUMMY',
    'DummyTile',
    { text: '' },
    ({ id, data }) => (
        <p>
            {id}: {data.text}
        </p>
    ),
    function DummyTileOptions({ id, dataState }) {
        const [text, setText] = useSubState(dataState, 'text');

        return (
            <>
                <DialogContentText>ID: {id}.</DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="dummy-text"
                    label="Text"
                    type="text"
                    fullWidth
                    value={text}
                    onChange={event => setText(event.target.value)}
                />
            </>
        );
    }
);
