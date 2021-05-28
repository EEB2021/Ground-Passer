import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Scoredb {
  readonly id: string;
  readonly name: string;
  readonly zeit?: string;
  readonly anztreffer?: number;
  readonly anzfehler?: number;
  readonly punkte?: number;
  constructor(init: ModelInit<Scoredb>);
  static copyOf(source: Scoredb, mutator: (draft: MutableModel<Scoredb>) => MutableModel<Scoredb> | void): Scoredb;
}