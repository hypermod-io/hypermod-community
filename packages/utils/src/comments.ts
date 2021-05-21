import core, { ASTNode } from 'jscodeshift';
import { Collection } from 'jscodeshift/src/Collection';

function clean(value: string) {
  return value
    .replace(/[ \t]{2,}/g, ' ')
    .replace(/^[ \t]*/gm, '')
    .trim();
}

export function addCommentBefore<NodeType = ASTNode>(
  j: core.JSCodeshift,
  path: Collection<NodeType>,
  message: string,
) {
  const content = ` TODO: (@codeshift) ${clean(message)} `;

  path.forEach(path => {
    // @ts-ignore
    path.value.comments = path.value.comments || [];

    // @ts-ignore
    const exists = path.value.comments.find(
      // @ts-ignore
      comment => comment.value === content,
    );

    // avoiding duplicates of the same comment
    if (exists) return;

    // @ts-ignore
    path.value.comments.push(j.commentBlock(content));
  });
}

export function addCommentToStartOfFile<NodeType = any>(
  j: core.JSCodeshift,
  path: Collection<NodeType>,
  message: string,
) {
  addCommentBefore(j, path.find(j.Program), message);
}
