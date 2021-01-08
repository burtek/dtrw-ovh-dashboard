import { dummyTile } from './dummy';
import { dummy2Tile } from './dummy2';
import type { Tile as BaseTile } from './Tile';

export const tiles = [
    dummyTile,
    dummy2Tile
];

export type Tile = typeof tiles[number];

export type TileType = Tile['type'];

export type TilesData = {
    [K in TileType]: Tile extends BaseTile<any, any> | BaseTile<K, infer D>
        ? D
        : never;
};

export type TileData<T extends TileType = TileType> = TilesData[T];
