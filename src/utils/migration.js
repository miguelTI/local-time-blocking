/**
 * Migration utilities for backward compatibility
 * Ensures data from older versions can be loaded without errors
 */

export function migrateState(savedState) {
  if (!savedState) return null;

  let migratedState = { ...savedState };

  // v1.1 → v1.2 Migration: Add task_type_id to existing tasks
  if (migratedState.tasks) {
    migratedState.tasks = migratedState.tasks.map((task) => ({
      ...task,
      task_type_id: task.task_type_id ?? null, // Add null if doesn't exist
    }));
  }

  // Ensure taskTypes array exists (for v1.0 → v1.1)
  if (!migratedState.taskTypes) {
    migratedState.taskTypes = [];
  }

  return migratedState;
}
