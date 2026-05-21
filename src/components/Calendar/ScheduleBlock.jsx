import { useAppContext } from '../../hooks/useAppContext';
import './ScheduleBlock.css';

export default function ScheduleBlock({ schedule, projectColor }) {
  const { state } = useAppContext();

  const task = state.tasks.find((t) => t.id === schedule.tarefa_id);

  if (!task) return null;

  const [startHour, startMin] = schedule.hora_inicio.split(':').map(Number);
  const [endHour, endMin] = schedule.hora_fim.split(':').map(Number);

  const startMinutes = startHour * 60 + startMin;
  const endMinutes = endHour * 60 + endMin;
  const durationMinutes = endMinutes - startMinutes;

  const blockHeight = (durationMinutes / 60) * 60;
  const topOffset = ((startMinutes - 360) / 60) * 60;

  return (
    <div
      className="schedule-block"
      style={{
        height: `${blockHeight}px`,
        top: `${topOffset}px`,
        borderLeftColor: projectColor,
      }}
      title={`${task.nome}\n${schedule.hora_inicio} - ${schedule.hora_fim}`}
    >
      <div className="block-content">
        <span className="block-time">
          {schedule.hora_inicio} - {schedule.hora_fim}
        </span>
        <span className="block-name">{task.nome}</span>
      </div>
    </div>
  );
}
