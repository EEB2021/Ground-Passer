import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Mitglieder {
  readonly id: string;
  readonly Name?: string;
  readonly Alter?: number;
  constructor(init: ModelInit<Mitglieder>);
  static copyOf(source: Mitglieder, mutator: (draft: MutableModel<Mitglieder>) => MutableModel<Mitglieder> | void): Mitglieder;
}