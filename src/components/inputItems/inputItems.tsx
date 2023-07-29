import React, { useEffect, useState } from 'react';
import AsyncSelect from 'react-select/async';
import { customStyles } from './styles';

interface Tag {
  name: string;
}
interface Tag {
  [x: string]: any;
  name: string;
}

interface InputItemProps {
  preFilledSkills: Tag[];
  onSkillChange: (selectedSkill: Tag | null, position: number) => void;
  onDeleteSkill: (position: number) => void; // Not used here, only used in the parent component
  isDisabled?: boolean;
  position: number;
}

const InputItem: React.FC<InputItemProps> = ({ preFilledSkills, position, onSkillChange, onDeleteSkill, isDisabled }) => {
  const [selectedSkill, setSelectedSkill] = useState<Tag | null>(null);
  const [availableTags, setAvailableTags] = useState<Tag[]>([]);
  const [showIcon, setShowIcon] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const tags: Tag[] = [
    { name: 'React' },
    { name: 'Vue' },
    { name: 'Angular' },
    { name: 'Node' },
    { name: 'Express' },
    { name: 'MongoDB' },
    { name: 'PostgreSQL' },
    { name: 'MySQL' },
    { name: 'Docker' },
    { name: 'Kubernetes' },
    { name: 'AWS' },

  ];

  useEffect(() => {
    const remainingTags = tags.filter(
      (tag) => selectedSkill === null || tag.name !== selectedSkill.name
    );
    setAvailableTags(remainingTags);
  }, [selectedSkill]);

  useEffect(() => {
    const firstNonEmptySkill = preFilledSkills.find(skill => skill.name !== '');
    setSelectedSkill(firstNonEmptySkill || null);
  }, [preFilledSkills]);

  const handleSkillChange = (selectedOption: Tag | null) => {
    if (selectedOption) {
      setSelectedSkill(selectedOption);
      saveToDatabase(selectedOption.name);
      onSkillChange(selectedOption, position);
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
    setIsSaving(true);
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
        setIsSaving(false);
      })
      .catch((error) => {
        console.error('Error saving skill to database:', error);
        setIsSaving(false);
      });
  };

  const deleteFromDatabase = (id: number) => {
    setIsDeleting(true);
    const apiUrl = `https://be-devfolio.pockethost.io/api/collections/skills/records/${id}`;
    fetch(apiUrl, {
      cache: 'no-store',
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then(() => {
        console.log('Skill deleted from database');
        setSelectedSkill(null);
        setIsDeleting(false);
      })
      .catch((error) => {
        console.error('Error deleting skill from database:', error);
        setIsDeleting(false);
      });

    return Promise.resolve();
  };

  const deleteSkill = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    const id = selectedSkill?.id;
    deleteFromDatabase(id)
      .then(() => {

        onSkillChange(null, position);
        setShowIcon(false);
        setAvailableTags((prevTags) =>
          prevTags.filter((tag) => tag.name !== selectedSkill?.name)
        );
        setSelectedSkill(null);
      })
      .catch((error) => {
        console.error('Error deleting skill:', error);
      });
  };

  const itemKey = selectedSkill ? `${position}.${selectedSkill.name}` : `${position}.empty`;


  return (
    <div key={itemKey} style={{ position: 'relative' }}>
      {selectedSkill && (
        <div
          style={{
            zIndex: 2,
            position: 'absolute',
            left: 'calc(100% - 50px)',
            top: '35%',
            margin: 0,
            padding: 0,
            border: 0,
            background: 'none',
            cursor: 'pointer',
          }}
          onClick={(event) => deleteSkill(event)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            stroke="#000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-x-circle"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M15 9l-6 6M9 9l6 6"></path>
          </svg>
        </div>
      )}
      <AsyncSelect
        value={selectedSkill ? { name: `${position}. ${selectedSkill.name}` } : null}
        onChange={handleSkillChange}
        loadOptions={loadOptions}
        defaultOptions={availableTags}
        getOptionLabel={(option) => option?.name || ''}
        getOptionValue={(option) => option?.name || ''}
        placeholder={`${position}. Add Skill`}
        styles={customStyles}
        isDisabled={selectedSkill !== null || isDisabled}
        components={{
          IndicatorSeparator: () => null,
        }}
      />
    </div>
  );
};

export default InputItem;