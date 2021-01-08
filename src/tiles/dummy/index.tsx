import { useState } from "react";
import { createTileType } from "../Tile";

export const dummyTile = createTileType(
    'DUMMY',
    'DummyTile',
    { text: '' },
    ({ id, data }) => <p>{id}: {data.text}</p>,
    function DummyTileOptions({ id, data, saveData }) {
        const [text, setText] = useState(data.text);
        const onSave = () => saveData(id, { text });
    
        return (
            <div>
            <div>ID: {id}</div>
                <div>
                    <label htmlFor="dummy-text">Text:</label>
                    <input
                        id="dummy-text"
                        value={text}
                        onChange={event => setText(event.target.value)}
                    />
                </div>
                <button onClick={onSave}>Save</button>
            </div>
        );
    }
);