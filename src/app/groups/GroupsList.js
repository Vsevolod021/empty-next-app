'use client';

const GroupsList = ({ groupsList }) => {
  return (
    <div className="groups-list">
      {groupsList.map((group) => (
        <div className="groups-list__item" key={group.id}>
          {group.name}
        </div>
      ))}
    </div>
  );
};

export default GroupsList;
