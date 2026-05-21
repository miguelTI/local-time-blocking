import { Draggable } from 'react-beautiful-dnd';
import { useAppContext } from '../../hooks/useAppContext';
import './ScheduleBlock.css';

export default function ScheduleBlock({ schedule, projectColor, index = 0 }) {
  const { state } = useAppContext();

  const { unscheduleTask } = useAppContext();
  const task = state.tasks.find((t) => t.id === schedule.tarefa_id);

  if (!task) return null;

  const handleRemove = (e) => {
    e.stopPropagation();
    if (window.confirm(`Remover "${task.nome}" do calendário?`)) {
      unscheduleTask(schedule.tarefa_id);
    }
  };

  const [startHour, startMin] = schedule.hora_inicio.split(':').map(Number);
  const [endHour, endMin] = schedule.hora_fim.split(':').map(Number);

  const startMinutes = startHour * 60 + startMin;
  const endMinutes = endHour * 60 + endMin;
  const durationMinutes = endMinutes - startMinutes;

  const blockHeight = (durationMinutes / 60) * 60;
  const topOffset = ((startMinutes - 360) / 60) * 60;

  return (
    <Draggable draggableId={`schedule-${task.id}-${schedule.id}`} index={index} type="RESCHEDULE">
      {(provided, snapshot) => (
        <div
          className={`schedule-block ${snapshot.isDragging ? 'dragging' : ''}`}
          style={{
            height: `${blockHeight}px`,
            top: `${topOffset}px`,
            borderLeftColor: projectColor,
            ...provided.draggableProps.style,
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
            <span className="block-name">{task.nome}</span>
          </div>
          <button className="block-remove" onClick={handleRemove} title="Remover">
            ✕
          </button>
        </div>
      )}
    </Draggable>
  );
}
