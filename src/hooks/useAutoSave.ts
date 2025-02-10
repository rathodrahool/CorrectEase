import { useEffect, useRef, useState, useCallback } from "react";
import { debounce } from "lodash";
import type { SaveState } from "../components/common/SaveStatus";

interface AutoSaveConfig {
  onSave: () => Promise<void>;
  interval?: number;
  debounceMs?: number;
  minLength?: number; // Minimum content length before auto-saving
  minTimeBetweenSaves?: number; // Minimum time between saves in ms
}

export const useAutoSave = ({
  onSave,
  interval = 30000,
  debounceMs = 3000, // Increased from 2000 to 3000
  minLength = 20, // Only save if content length > 20 chars
  minTimeBetweenSaves = 5000, // Minimum 5 seconds between saves
}: AutoSaveConfig) => {
  const hasUnsavedChanges = useRef(false);
  const contentLength = useRef(0);
  const lastSaveTime = useRef(0);
  const [saveState, setSaveState] = useState<SaveState>("saved");

  const save = useCallback(async () => {
    if (!hasUnsavedChanges.current || contentLength.current < minLength) return;

    const now = Date.now();
    if (now - lastSaveTime.current < minTimeBetweenSaves) {
      // If trying to save too soon, schedule another save
      debouncedSave.current();
      return;
    }

    setSaveState("saving");
    try {
      await onSave();
      hasUnsavedChanges.current = false;
      lastSaveTime.current = now;
      setSaveState("saved");
    } catch (error) {
      setSaveState("unsaved");
      console.error("Auto-save failed:", error);
    }
  }, [onSave, minLength, minTimeBetweenSaves]);

  const debouncedSave = useRef(
    debounce(async () => {
      await save();
    }, debounceMs)
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      debouncedSave.current.cancel();
    };
  }, []);

  // Interval save
  useEffect(() => {
    const intervalId = setInterval(save, interval);
    return () => clearInterval(intervalId);
  }, [save, interval]);

  return {
    setHasChanges: useCallback(
      (hasChanges: boolean, length: number = 0) => {
        hasUnsavedChanges.current = hasChanges;
        contentLength.current = length;
        if (hasChanges && length >= minLength) {
          setSaveState("unsaved");
          debouncedSave.current();
        }
      },
      [minLength]
    ),
    saveState,
    forceSave: save,
  };
};
