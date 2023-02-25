import { Providers } from "./";

export type FeatureToggle = {
  uiName?: string;
  type: Providers;
  state: boolean;
};
