import assign from 'lodash/assign';
import cloneDeep from 'lodash/cloneDeep';
import type { ComponentType } from 'react';
import type { TileGeometry } from '../data/tiles';

export abstract class Tile<Type extends string, Data extends {}> {
    public readonly defaultGeometry: TileGeometry;
    constructor(
        public readonly type: Type,
        public readonly name: string,
        defaultGeometry: Partial<TileGeometry> = {}
    ) {
        this.defaultGeometry = assign(defaultGeometry, {
            x: 0,
            y: 0,
            width: 200,
            height: 200
        } as TileGeometry, defaultGeometry);
    }

    public abstract getDefaultData: () => Data;
    public abstract render: ComponentType<RenderProps<Data>>;
    public abstract renderOptions: ComponentType<RenderOptionsProps<Data>>;
}

export interface RenderProps<Data extends {}> {
    id: string;
    data: Data;
}
export interface RenderOptionsProps<Data extends {}> {
    id: string;
    data: Data;
    saveData: (id: string, data: Data) => void;
}

export type TileDataType<T extends Tile<any, any>> = T extends Tile<string, infer D> ? D : never;

export function createTileType<Type extends string, Data extends {}>(
    type: Type,
    name: string,
    defaultData: Data | (() => Data),
    render: ComponentType<RenderProps<Data>>,
    renderOptions: ComponentType<RenderOptionsProps<Data>>,
    defaultGeometry: Partial<TileGeometry> = {}
) {
    return new (class extends Tile<Type, Data> {
        constructor() {
            super(type, name, defaultGeometry);
        }

        public getDefaultData = defaultData instanceof Function ? defaultData : () => cloneDeep(defaultData);
        public render = render;
        public renderOptions = renderOptions;
    })() as Tile<Type, Data>;
}
