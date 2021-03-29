import { useDrag, DragSourceMonitor } from 'react-dnd';
import classNames from 'classnames';
import Cell from '../grid/cell/Cell';
import { ShipProps } from './Ship.model';
import {
  DefaultGridDimesions,
  ItemTypes,
  IDragItem,
  IDropResult,
} from '../../App.model';
import styles from './Ship.module.scss';

export default function Ship({
  length,
  orientation,
  updateGridState,
  isPlacedOnGrid = false,
}: ShipProps) {
  const draggedItem: IDragItem = {
    orientation,
    length,
  };
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.Ship,
    item: draggedItem,
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    end: (item: IDragItem, monitor: DragSourceMonitor) => {
      const dropResult: IDropResult | null = monitor.getDropResult();
      if (dropResult) {
        const { rowIndex, columnIndex } = dropResult;
        if (dropResult && updateGridState) {
          updateGridState(1, rowIndex, columnIndex);
        }
      }
    },
  }));
  const shipArray = [...Array(length).fill(0, 0, length)];
  const width = orientation === 'horizontal' ? DefaultGridDimesions.CellSize * length : DefaultGridDimesions.CellSize;
  const shipClasses = classNames({
    [styles[`ship${orientation}`]]: true,
    [styles.isPlacedOnGrid]: isPlacedOnGrid,
  });
  return (
    <div ref={drag} className={shipClasses} style={{ width, opacity: isDragging ? 0.5 : 1, height: isPlacedOnGrid && orientation === 'horizontal' ? DefaultGridDimesions.CellSize : 'auto' }}>
      {
        shipArray.map((el, index) => <Cell updateGridState={updateGridState} key={`${orientation}-${el + index}`} isShip />)
      }
    </div>
  );
}