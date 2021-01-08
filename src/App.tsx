import { useSelector } from 'react-redux';
import AddButton from './components/AddButton';
import Tile from './components/Tile';
import type { AppState } from './data';
import styles from './styles/index.module.scss';

const selectIds = (state: AppState) => state.tiles.ids as string[]

function mapTile(id: string) {
    return <Tile id={id} key={id} />
}

export default function App() {
    const tileList = useSelector(selectIds);

    return (
        <div className={styles.dashboard}>
            {tileList.map(mapTile)}
            <AddButton />
        </div>
    );
}
