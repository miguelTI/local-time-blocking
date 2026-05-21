import { Droppable } from 'react-beautiful-dnd';
import './TimeSlot.css';

export default function TimeSlot({ hour, date, children, blocks, onClick }) {
  console.log(`🎯 TimeSlot rendered with type="SCHEDULE" for ${date}-${hour}`);
  return (
    <Droppable droppableId={`timeslot-${date}-${hour}`} type="SCHEDULE">
      {(provided, snapshot) => (
        <div
          className={`time-slot ${snapshot.isDraggingOver ? 'drag-over' : ''}`}
          onClick={onClick}
          data-hour={hour}
          data-date={date}
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={{ position: 'relative', ...provided.droppableProps.style }}
        >
          {blocks}
          {children}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
