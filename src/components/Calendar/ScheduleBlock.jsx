import { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useAppContext } from '../../hooks/useAppContext';
import CompleteTaskModal from '../Common/CompleteTaskModal';
import './ScheduleBlock.css';

export default function ScheduleBlock({ schedule, projectColor, index = 0 }) {
  const { state, getTaskTypes, completeTask } = useAppContext();
  const { unscheduleTask } = useAppContext();
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const task = state.tasks.find((t) => t.id === schedule.tarefa_id);
  const taskTypes = getTaskTypes();

  if (!task) return null;

  const taskType = task.task_type_id ? taskTypes.find((t) => t.id === task.task_type_id) : null;
  const blockColor = taskType?.cor || projectColor;

  const handleRemove = (e) => {
    e.stopPropagation();
    if (window.confirm(`Remover "${task.nome}" do calendário?`)) {
      unscheduleTask(schedule.tarefa_id);
    }
  };

  const handleCompleteSubmit = (tempo_gasto) => {
    try {
      completeTask(task.id, tempo_gasto);
      setShowCompleteModal(false);
    } catch (err) {
      console.error('Erro ao concluir:', err);
    }
  };

  const [startHour, startMin] = schedule.hora_inicio.split(':').map(Number);
  const [endHour, endMin] = schedule.hora_fim.split(':').map(Number);

  const startMinutes = startHour * 60 + startMin;
  const endMinutes = endHour * 60 + endMin;
  const durationMinutes = endMinutes - startMinutes;

  const blockHeight = (durationMinutes / 60) * 60;
  const topOffset = startMin; // Offset within the TimeSlot (only minutes of the hour)

  return (
    <>
      <Draggable draggableId={`schedule_${task.id}_${schedule.id}`} index={index} type="SCHEDULE">
      {(provided, snapshot) => (
        <div
          className={`schedule-block ${snapshot.isDragging ? 'dragging' : ''}`}
          style={{
            ...provided.draggableProps.style,
            height: `${blockHeight}px`,
            top: `${topOffset}px`,
            borderLeftColor: blockColor,
          }}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          title={`${task.nome}\n${schedule.hora_inicio} - ${schedule.hora_fim}`}
        >
          <div className="block-content">
            <span className="block-time">
              {schedule.hora_inicio} - {schedule.hora_fim}
            </span>
            <span className="block-name" style={{ color: projectColor }}>
              {task.nome}
            </span>
          </div>
          <div className="block-actions">
            <button
              className="block-complete"
              onClick={(e) => {
                e.stopPropagation();
                setShowCompleteModal(true);
              }}
              title="Concluir"
            >
              ✓
            </button>
            <button className="block-remove" onClick={handleRemove} title="Remover">
              ✕
            </button>
          </div>
        </div>
      )}
    </Draggable>

    {showCompleteModal && (
      <CompleteTaskModal
        task={task}
        onComplete={handleCompleteSubmit}
        onCancel={() => setShowCompleteModal(false)}
      />
    )}
    </>
  );
}
