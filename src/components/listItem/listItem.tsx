import React, { useEffect, useState } from 'react';
import InputItem from '@/components/inputItems/inputItems';

interface Tag {
  name: string;
}

interface ListItemProps {
  preFilledSkills: Tag[];
  maxInputs: number;
  
}
const ListItem: React.FC<ListItemProps> = ({ preFilledSkills, maxInputs}) => {


  const handleSkillChange = (selectedSkill: Tag | null) => {
    console.log('Selected Skill:', selectedSkill);
  };

  const filledSkills = [...preFilledSkills];
  while (filledSkills.length < maxInputs) {
    filledSkills.push({ name: '' });
  }

  return (
    <div>
      {filledSkills.map((skill, index) => (
        <InputItem key={index} preFilledSkills={skill ? [skill] : []} onSkillChange={handleSkillChange} isDisabled={index >= maxInputs && !!skill} />
      ))}
    </div>
  );
};

export default ListItem;
