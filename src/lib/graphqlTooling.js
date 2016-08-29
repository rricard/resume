/* @flow */

export type GraphQLDocument = {
  kind: 'Document',
  definitions: Array<any>,
  loc: any,
};

export function mergeDocumentDefinitions(...documents: Array<GraphQLDocument>): GraphQLDocument {
  return {
    ...documents[0],
    definitions: [].concat(...documents.map(doc => doc.definitions)),
  };
}
