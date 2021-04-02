import { CellState, GridState } from '../../../App.model';
export interface ICellProps {
  rowIndex?: number,
  columnIndex?: number,
  isShip?: boolean,
  isOver?: boolean,
  cellState?: CellState,
  updateGridState: Function | undefined,
  gridState?: GridState
}