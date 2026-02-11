import React from 'react';

const TableRow = ({ item, level, expandedRows, onToggle }) => {
  const hasChildren = item.children && item.children.length > 0;
  const isExpanded = expandedRows.has(item.id);
  
  const handleToggle = (e) => {
    e.stopPropagation();
    if (hasChildren) {
      onToggle(item.id);
    }
  };

  const rowStyle = {
    paddingLeft: `${level * 20}px`,
    backgroundColor: level % 2 === 0 ? '#f9f9f9' : '#fff'
  };

  return (
    <>
      <tr className={`data-row ${hasChildren ? 'has-children' : ''}`}>
        <td className="expand-cell" onClick={handleToggle}>
          {hasChildren ? (
            <span className="expand-icon">{isExpanded ? '−' : '+'}</span>
          ) : (
            <span className="expand-placeholder"> </span>
          )}
        </td>
        <td>{item.id}</td>
        <td style={rowStyle}>
          <span className="name-content">
            {item.name}
          </span>
        </td>
        <td>{item.email}</td>
        <td>{item.balance}</td>
        <td>
          <span className={`status-badge ${item.isActive ? 'active' : 'inactive'}`}>
            {item.isActive ? 'Активен' : 'Неактивен'}
          </span>
        </td>
      </tr>
      {hasChildren && isExpanded && item.children.map(child => (
        <TableRow
          key={child.id}
          item={child}
          level={level + 1}
          expandedRows={expandedRows}
          onToggle={onToggle}
        />
      ))}
    </>
  );
};

export default TableRow;