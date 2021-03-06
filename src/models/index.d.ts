import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Scoredb {
  readonly id: string;
  readonly name: string;
  readonly zeit: string;
  constructor(init: ModelInit<Scoredb>);
  static copyOf(source: Scoredb, mutator: (draft: MutableModel<Scoredb>) => MutableModel<Scoredb> | void): Scoredb;
}