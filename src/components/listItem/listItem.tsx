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

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);

  const handleDragStart = (index: number) => {
    if (skills[index].name === '') {
      // If the skill is empty, prevent dragging
      return;
    }
    setDraggedItemIndex(index);
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setDraggedItemIndex(null);
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (targetIndex: number) => {
    if (draggedItemIndex === null || draggedItemIndex === targetIndex) return;

    // Prevent dropping filled skill into non-filled skill
    if (skills[targetIndex].name == '') return;

    const reorderedSkills = [...skills];
    const [removedSkill] = reorderedSkills.splice(draggedItemIndex, 1);
    reorderedSkills.splice(targetIndex, 0, removedSkill);
    setSkills(reorderedSkills);
    handleDragEnd();
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
                draggable={skill.name !== ''} // Only make filled skills draggable
                onDragStart={() => handleDragStart(index)}
                onDrop={() => handleDrop(index)}
                onDragOver={handleDragOver}
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
                draggable={skill.name !== ''} // Only make filled skills draggable
                onDragStart={() => handleDragStart(currentPosition - 1)}
                onDrop={() => handleDrop(currentPosition - 1)}
                onDragOver={handleDragOver}
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