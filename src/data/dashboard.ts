// import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
// import { v4 as uuidv4 } from 'uuid';
// import type { TileData, TileType } from '../tiles';

// const dashboardAdapter = createEntityAdapter<Dashboard>();
// dashboardAdapter.addOne(dashboardAdapter.getInitialState(), { id: '::default::', name: 'Default', tiles: [] });

// const slice = createSlice({
//     name: 'dashboards',
//     initialState: dashboardAdapter.getInitialState(),
//     reducers: {
//         addDashboard: {
//             prepare<T extends TileType>(type: T, data: TileData<T>) {
//                 return {
//                     payload: {
//                         type,
//                         id: uuidv4(),
//                         data
//                     }
//                 };
//             },
//             reducer: dashboardAdapter.addOne
//         }
//     }
// });

// const { reducer, actions } = slice;
// export const tilesReducer = reducer;
// export const { addTile, editTile, removeTile } = actions;

// interface Dashboard {
//     id: string;
//     name: string;
//     tiles: string[];
// }

export {}