import { DocumentNode } from 'graphql'; // eslint-disable-line import/no-extraneous-dependencies, import/no-unresolved

import { QueryInfo } from './context';
import { ParsedQuery } from './ParsedQueryNode';
import { JsonObject } from './primitive';

/**
 * Change ids track diffs to the store that may eventually be rolled back.
 */
export type ChangeId = string;

/**
 * All node ids must be strings, for now.
 */
export type NodeId = string;

/**
 * Entity ids are just a specialized node id.
 *
 * Having a separate type is useful for documentation and safety.
 */
export type EntityId = NodeId;

/**
 * There are a few pre-defined nodes present in all schemas.
 */
export enum StaticNodeId {
  QueryRoot = 'ROOT_QUERY',
  MutationRoot = 'ROOT_MUTATION',
  SubscriptionRoot = 'ROOT_SUBSCRIPTION',
}

/**
 * All the information needed to describe a complete GraphQL operation that can
 * be made against the cache (read or written).
 */
export interface RawOperation {
  /** The id of the node to begin the query at. */
  readonly rootId: NodeId;
  /** A parsed GraphQL document, declaring an operation to execute. */
  readonly document: DocumentNode;
  /** Any variables used by parameterized fields within the selection set. */
  readonly variables?: JsonObject;
}

/**
 * A processed query, ready for consumption by the cache, with values for any
 * variables already substituted in.
 */
export interface OperationInstance {
  /** The id of the node to begin the query at. */
  readonly rootId: NodeId;
  /** A parsed GraphQL document, declaring an operation to execute. */
  readonly info: QueryInfo;
  /** Parsed form of the query, with values substituted for any variables. */
  readonly parsedQuery: ParsedQuery;
  /** Whether the operation contains _no_ parameterized values. */
  readonly isStatic: boolean;
  /** Any variables used by parameterized fields within the selection set. */
  readonly variables?: JsonObject;
}

/**
 * Represents a single query and a set of values that match its selection.
 */
export interface QuerySnapshot {
  query: RawOperation;
  payload?: JsonObject;
}
