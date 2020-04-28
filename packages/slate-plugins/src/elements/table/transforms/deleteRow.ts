import { defaultTableTypes } from 'elements/table/types';
import { Editor, Transforms } from 'slate';
import { isSelectionInTable, isTable, isTableRow } from '../queries';

export const deleteRow = (editor: Editor, options = defaultTableTypes) => {
  if (isSelectionInTable(editor, options)) {
    const currentTableItem = Editor.above(editor, {
      match: isTable(options),
    });
    const currentRowItem = Editor.above(editor, {
      match: isTableRow(options),
    });
    if (
      currentRowItem &&
      currentTableItem &&
      // Cannot delete the last row
      currentTableItem[0].children.length > 1
    ) {
      Transforms.removeNodes(editor, {
        at: currentRowItem[1],
      });
    }
  }
};
