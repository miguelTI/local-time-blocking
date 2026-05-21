import './TimeSlot.css';

export default function TimeSlot({ hour, date, children, blocks, onClick }) {
  return (
    <div
      className="time-slot"
      onClick={onClick}
      data-hour={hour}
      data-date={date}
      style={{ position: 'relative' }}
    >
      {blocks}
      {children}
    </div>
  );
}
