import { Tag } from '@/app/assets/data';
import React, { useState } from 'react';
import styled from 'styled-components';

const ListItemWrapper = styled.input<{isplaceholder: boolean }>`
  background-color: ${({ isplaceholder }) => (isplaceholder ? 'transparent' : '#73EACC')};
  border: 1px solid ${({ isplaceholder }) => (isplaceholder ? '#65D0B4' : '#65D0B4')};
  border-radius: 4px;
  padding: 1rem;
  margin: 0.5rem;
  color: #235045;
  font-weight: 400;
  font-size: 1.125rem;
  cursor: move;
`;

interface ListItemProps {
  tag: Tag;
  itemNumber: number;
  isplaceholder: boolean;
  handleTagUpdate: (updatedTag: Tag) => void;
}

const ListItem: React.FC<ListItemProps> = ({ tag, itemNumber, isplaceholder, handleTagUpdate}) => {
  const [editing, setEditing] = useState(tag.name === 'Add Skill' ? true : false);
  const [editedName, setEditedName] = useState(tag.name);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedName(e.target.value);
  };

  const handleInputBlur = () => {
    setEditing(tag.name === 'Add Skill' && editedName.trim() === '');
    tag.name = editedName || 'Add Skill';
    handleTagUpdate(tag);
  };

  const handleClick = () => {
    if (tag.name === 'Add Skill') {
      setEditedName('');
      setEditing(true);
    }
  };

  return (
    <ListItemWrapper
      type="text"
      value={editing ? editedName : tag.name}
      onChange={handleInputChange}
      onBlur={handleInputBlur}
      onClick={handleClick}
      readOnly={!editing && tag.name !== 'Add Skill'}
      isplaceholder={isplaceholder}
    />
  );
};

export default ListItem;
