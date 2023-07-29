import React, { useEffect, useState } from 'react';
import InputItem from '../inputItems/inputItems';
import { ListContainer, BearerColumn } from './styles';

interface Tag {
  name: string;
}

interface ListItemProps {
  preFilledSkills: Tag[];
  maxInputs: number;
}

const ListItem: React.FC<ListItemProps> = ({ preFilledSkills, maxInputs }) => {
  const [skills, setSkills] = useState<Tag[]>([]);

  useEffect(() => {
    const filledSkills = preFilledSkills.slice(0, maxInputs);
    while (filledSkills.length < maxInputs) {
      filledSkills.push({ name: '' });
    }
    setSkills(filledSkills);
  }, [preFilledSkills, maxInputs]);

  const handleSkillChange = (selectedSkill: Tag | null, position: number) => {
    console.log('Selected Skill at position', position, ':', selectedSkill);
    // You can update the skills state or perform other actions here.
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || draggedItemIndex === null) return;
  
    setOffsetX(e.clientX - initialMouseX);
    setOffsetY(e.clientY - initialMouseY);
  };
  
  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    handleDragEnd();
  };
  
  const handleDragStart = (index: number, e: React.MouseEvent) => {
  const skill = skills[index];

  // Allow dragging only if the skill has a value (name !== '')
  if (skill.name !== '') {
    document.addEventListener('mousemove', handleMouseMove as any);
    document.addEventListener('mouseup', handleMouseUp as any);
    setDraggedItemIndex(index);
    setIsDragging(true);
    setInitialMouseX(e.clientX);
    setInitialMouseY(e.clientY);
  }
};
  

  const handleDragEnd = () => {
    if (draggedItemIndex === null) return;
    setDraggedItemIndex(null);
    setIsDragging(false);
    setOffsetX(0);
    setOffsetY(0);
  };

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);
  const [offsetX, setOffsetX] = useState<number>(0);
  const [offsetY, setOffsetY] = useState<number>(0);
  const [initialMouseX, setInitialMouseX] = useState<number>(0);
  const [initialMouseY, setInitialMouseY] = useState<number>(0);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (targetIndex: number) => {
    if (draggedItemIndex === null || draggedItemIndex === targetIndex) return;

    // Prevent dropping filled skill into non-filled skill
    if (skills[targetIndex].name === '') return;

    const reorderedSkills = [...skills];
    const [removedSkill] = reorderedSkills.splice(draggedItemIndex, 1);
    reorderedSkills.splice(targetIndex, 0, removedSkill);
    setSkills(reorderedSkills);
    handleDragEnd();
  };

  let prevDraggedItemIndex = -1; 

  const calculateTransform = (index: number) => {
    if (isDragging && draggedItemIndex !== null) {
      if (index === draggedItemIndex) {
        prevDraggedItemIndex = draggedItemIndex; 
        return `translate(0, ${offsetY}px)`;
      } else if (index === draggedItemIndex + 1 && index !== prevDraggedItemIndex + 1) {
        return `translate(0, ${offsetY > 20 ? -80 : 80}px)`;
      }
    }
    return '';
  };

  const calculateTransition = (index: number) => {
    if (isDragging && draggedItemIndex !== null) {
      if (index === draggedItemIndex || index === draggedItemIndex + 1) {
        return 'transform 0.2s ease';
      }
    }
    return '';
  };

  return (
    <div>
      <ListContainer>
        <BearerColumn onDragOver={handleDragOver}>
          {skills.slice(0, maxInputs / 2).map((skill, index) => {
            const currentPosition = index + 1;
            return (
              <div
                key={currentPosition}
                draggable={skill.name !== ''} // Allow dragging only if the skill has a value
                onMouseDown={(e) => handleDragStart(index, e)}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(index)}
                style={{
                  // Add user-select style here to prevent text selection while dragging
                  userSelect: 'none',
                  transform: calculateTransform(index),
                  transition: calculateTransition(index),
                }}
              >
                <InputItem
                  onDeleteSkill={() => console.log('Delete Skill at position', currentPosition)}
                  preFilledSkills={skills.slice(index, index + 1)}
                  onSkillChange={(selectedSkill: Tag | null) =>
                    handleSkillChange(selectedSkill, index)
                  }
                  isDisabled={index < preFilledSkills.length}
                  position={currentPosition}
                />
              </div>
            );
          })}
        </BearerColumn>
        <BearerColumn onDragOver={handleDragOver}>
          {skills.slice(maxInputs / 2).map((skill, index) => {
            const currentPosition = maxInputs / 2 + index + 1;
            return (
              <div
                key={currentPosition}
                draggable={skill.name !== ''} // Allow dragging only if the skill has a value
                onMouseDown={(e) => handleDragStart(currentPosition - 1, e)}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(currentPosition - 1)}
                style={{
                  // Add user-select style here to prevent text selection while dragging
                  userSelect: 'none',
                  transform: calculateTransform(currentPosition - 1),
                  transition: calculateTransition(currentPosition - 1),
                }}
              >
                <InputItem
                  onDeleteSkill={() => console.log('Delete Skill at position', currentPosition)}
                  preFilledSkills={skills.slice(currentPosition - 1, currentPosition)}
                  onSkillChange={(selectedSkill: Tag | null) =>
                    handleSkillChange(selectedSkill, currentPosition)
                  }
                  isDisabled={currentPosition <= preFilledSkills.length}
                  position={currentPosition}
                />
              </div>
            );
          })}
        </BearerColumn>
      </ListContainer>
    </div>
  );
};

export default ListItem;