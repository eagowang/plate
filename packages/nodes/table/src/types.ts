import { PlateEditor, TDescendant, TElement, Value } from '@udecode/plate-core';
import { Path } from 'slate';

export interface TablePlugin<V extends Value = Value> {
  /**
   * Disable expanding the table when inserting cells.
   */
  disableExpandOnInsert?: boolean;

  /**
   * Disable unsetting the first column width when the table has one column.
   * Set it to true if you want to resize the table width when there is only one column.
   * Keep it false if you have a full-width table.
   */
  disableUnsetSingleColSize?: boolean;

  /**
   * @default empty paragraph
   */
  newCellChildren?: TDescendant[];

  /**
   * @default insertTableColumn
   */
  insertColumn?: (
    editor: PlateEditor<V>,
    options: {
      fromCell: Path;
    }
  ) => void;

  /**
   * @default insertTableRow
   */
  insertRow?: (
    editor: PlateEditor<V>,
    options: {
      fromRow: Path;
    }
  ) => void;
}

export interface TTableElement extends TElement {
  colSizes?: number[];
}
