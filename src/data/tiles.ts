import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import assign from 'lodash/assign';
import { v4 as uuidv4 } from 'uuid';
import { TileData, tiles, TileType } from '../tiles';

const tilesAdapter = createEntityAdapter<TileState>();

const slice = createSlice({
    name: 'tiles',
    initialState: tilesAdapter.getInitialState(),
    reducers: {
        addTile: {
            prepare<T extends TileType>(type: T, geometry: Partial<TileGeometry> = {}) {
                const tile = tiles.find(tile => tile.type === type)!;
                return {
                    payload: {
                        type,
                        id: uuidv4(),
                        data: tile.getDefaultData(),
                        ...assign({}, tile.defaultGeometry, geometry)
                    }
                };
            },
            reducer: tilesAdapter.addOne
        },
        moveTile: {
            prepare(id: string, changes: Partial<TileGeometry>) {
                return {
                    payload: {
                        id,
                        changes
                    }
                };
            },
            reducer: tilesAdapter.updateOne
        },
        editTile: {
            prepare(id: string, data: TileData) {
                return {
                    payload: {
                        id,
                        changes: {
                            data
                        }
                    }
                };
            },
            reducer: tilesAdapter.updateOne
        },
        removeTile: {
            prepare(id: string) {
                return {
                    payload: id
                }
            },
            reducer: tilesAdapter.removeOne
        }
    }
});

const { reducer, actions } = slice;
export const tilesReducer = reducer;
export const { addTile, moveTile, editTile, removeTile } = actions;

interface BaseTileState {
    id: string;

    x: number;
    y: number;
    width: number;
    height: number;
}
export type TileGeometry = Pick<BaseTileState, 'x' | 'y' | 'width' | 'height'>;

interface SingleTileState<T extends TileType> extends BaseTileState {
    type: T;
    data: TileData<T>;
}
type TileState = {
    [K in TileType]: SingleTileState<K>;
}[TileType];

