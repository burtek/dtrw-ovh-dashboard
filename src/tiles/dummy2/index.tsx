import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import { createTileType } from "../Tile";
import { useSubState } from "../useSubState";

export const dummy2Tile = createTileType(
    'DUMMY3',
    'DummyTile2',
    { text: '' },
    ({ id, data }) => <p>{id}: {data.text}</p>,
    function DummyTile2Options({ id, dataState }) {
        const [text, setText] = useSubState(dataState, 'text');

        return (
            <>
                <DialogContentText>ID 2: {id}.</DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="dummy-text"
                    label="Text 2"
                    type="text"
                    fullWidth
                    value={text}
                    onChange={event => setText(event.target.value)}
                />
            </>
        );
    }
);