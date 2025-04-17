import { useRef, useState, useCallback, useEffect } from "react";
import type { SaveState } from "../components/common/SaveStatus";

interface AutoSaveConfig {
  onSave: () => Promise<void>;
  delay?: number; // Delay in ms before saving
}

export const useAutoSave = ({ onSave, delay = 5000 }: AutoSaveConfig) => {
  const [saveState, setSaveState] = useState<SaveState>("saved");
  const hasUnsavedChanges = useRef(false);
  const saveTimeoutRef = useRef<number>();

  const save = useCallback(async () => {
    if (!hasUnsavedChanges.current) return;

    setSaveState("saving");
    try {
      await onSave();
      hasUnsavedChanges.current = false;
      setSaveState("saved");
    } catch (error) {
      setSaveState("unsaved");
      console.error("Auto-save failed:", error);
    }
  }, [onSave]);

  const setHasChanges = useCallback((hasChanges: boolean) => {
    hasUnsavedChanges.current = hasChanges;
    if (hasChanges) {
      setSaveState("unsaved");
    }
  }, []);

  const scheduleSave = useCallback(() => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(save, delay);
  }, [save, delay]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  return { setHasChanges, saveState, scheduleSave };
};
