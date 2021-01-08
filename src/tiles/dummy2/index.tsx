import { useState } from "react";
import { createTileType } from "../Tile";

export const dummy2Tile = createTileType(
    'DUMMY2',
    'DummyTile2',
    { text: '' },
    ({ id, data }) => <p>{id}: {data.text}</p>,
    ({ id, data, saveData }) => {
        const [text, setText] = useState(data.text);
        const onSave = () => saveData(id, { text });

        return (
            <div>
                <div>ID 2: {id}</div>
                <div>
                    <label htmlFor="dummy-text">Text 2:</label>
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