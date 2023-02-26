import { FeatureToggle } from "../types";

export const saveFeatureToggles = async (
  featureToggles: Array<FeatureToggle>
) => {
  try {
    await chrome.storage.local.set({ featureToggles });
  } catch (e) {
    console.error(e);
  }
};

export const writeFeatureToggles = async (
  featureToggles: Array<FeatureToggle>
) => {
  try {
    const flatFeatureToggles = JSON.stringify(
      featureToggles.reduce<Record<string, boolean>>((acc, featureToggle) => {
        if (featureToggle.state === null) return { ...acc };
        return { ...acc, [featureToggle.name]: featureToggle.state };
      }, {})
    );

    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    const tab = tabs[0];
    if (!tab?.id) throw new Error("No id error");
    await chrome.scripting.executeScript({
      args: [flatFeatureToggles],
      target: { tabId: tab.id },
      func: (injection) => {
        window.localStorage.setItem("override-toggles", injection);
      },
    });
  } catch (e) {
    console.error(e);
  }
};

export const loadFeatureToggles = async (): Promise<Array<FeatureToggle>> => {
  try {
    const { featureToggles } = await chrome.storage.local.get([
      "featureToggles",
    ]);
    if (Array.isArray(featureToggles)) return featureToggles;
    saveFeatureToggles([]);
    return [];
  } catch (e) {
    console.error(e);
    return [];
  }
};
