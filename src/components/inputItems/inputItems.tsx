import React, { useEffect, useState } from 'react';
import AsyncSelect from 'react-select/async';
import { customStyles } from './styles';
import styled from 'styled-components';

interface Tag {
  name: string;
}

interface InputItemProps {
  preFilledSkills: Tag[];
  onSkillChange: (selectedSkill: Tag | null) => void;
  isDisabled?: boolean;
}

const InputItem: React.FC<InputItemProps> = ({ preFilledSkills, onSkillChange, isDisabled }) => {
  const [selectedSkill, setSelectedSkill] = useState<Tag | null>(null);
  const [availableTags, setAvailableTags] = useState<Tag[]>([]);
  const tags: Tag[] = [
    { name: 'JavaScript' },
    { name: 'TypeScript' },
    { name: 'React' },
  ];

  useEffect(() => {
    const remainingTags = tags.filter(
      (tag) => selectedSkill === null || tag.name !== selectedSkill.name
    );
    setAvailableTags(remainingTags);
  }, [selectedSkill]);

  useEffect(() => {
    setSelectedSkill(preFilledSkills.length > 0 ? preFilledSkills[0] : null);
  }, [preFilledSkills]);

  const handleSkillChange = (selectedOption: Tag | null) => {
    if (selectedOption) {
      setSelectedSkill(selectedOption);
      saveToDatabase(selectedOption.name);
    }
  };

  const filterTag = (inputValue: string) => {
    return availableTags.filter((tag) =>
      tag.name.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const loadOptions = (inputValue: string, callback: (options: Tag[]) => void) => {
    setTimeout(() => {
      const filteredTags = filterTag(inputValue);
      callback(filteredTags);
    }, 1000);
  };

  const saveToDatabase = (skillName: string) => {
    const apiUrl = 'https://be-devfolio.pockethost.io/api/collections/skills/records';

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        skills: skillName,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Skill saved to database:', data);
      })
      .catch((error) => {
        console.error('Error saving skill to database:', error);
      });
  };

  return (
    <AsyncSelect
      value={selectedSkill?.name ? selectedSkill : null}
      onChange={handleSkillChange}
      loadOptions={loadOptions}
      defaultOptions={availableTags}
      getOptionLabel={(option) => option?.name}
      getOptionValue={(option) => option?.name}
      placeholder={1 + '.' + ' Add Skill'}
      styles={customStyles}
    />
  );
};

export default InputItem;
