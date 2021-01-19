import { useSelector } from 'react-redux';
import type { AppState } from '../data';
import type { TileState } from '../data/tiles';
import { dummyTile } from './dummy';
import { dummy2Tile } from './dummy2';
import type { BaseTile } from './Tile';

export const tiles = [
    dummyTile,
    dummy2Tile
];

export function findTileByType(type: TileType) {
    return tiles.find(tile => tile.type === type)!;
}
export function useTileSelector(id: string): TileState;
export function useTileSelector(id: string | null): TileState | null;
export function useTileSelector(id: string | null) {
    return useSelector((state: AppState) => id === null ? null : state.tiles.entities[id as string]!);
}

export type TileStrategy = typeof tiles[number];

export type TileType = TileStrategy['type'];

type TilesData = {
    [K in TileType]: TileStrategy extends BaseTile<any, any> | BaseTile<K, infer D>
        ? D
        : never;
};

export type TileData<T extends TileType = TileType> = TilesData[T];
