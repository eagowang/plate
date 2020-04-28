import { PARAGRAPH } from 'elements/paragraph';
import { isBlockActive } from 'elements/queries';
import { Editor, Transforms } from 'slate';
import { ListType } from '../types';
import { unwrapList } from './unwrapList';

export const toggleList = (
  editor: Editor,
  {
    typeList,
    typeLi = ListType.LI,
    typeP = PARAGRAPH,
  }: { typeList: string; typeLi?: string; typeP?: string }
) => {
  const isActive = isBlockActive(editor, typeList);

  unwrapList(editor);

  Transforms.setNodes(editor, {
    type: typeP,
  });

  if (!isActive) {
    const list = { type: typeList, children: [] };
    Transforms.wrapNodes(editor, list);

    const nodesIterable = Editor.nodes(editor, {
      match: (node) => node.type === typeP,
    });
    const nodes = [...nodesIterable];

    const listItem = { type: typeLi, children: [] };

    for (const [, path] of nodes) {
      Transforms.wrapNodes(editor, listItem, {
        at: path,
      });
    }
  }
};
