'use client'
import React, {useEffect, useState} from 'react'

import { Container, CustomUnorderList, Card, InnerCard,Text,TextGrey } from './styles'
import ListItem from '@/components/listItem/listItem'
import InputItem from '@/components/inputItems/inputItems'
const DNDPage = () => {

    const [preFilledSkills, setPreFilledSkills] = useState<{ name: string }[]>([]);
    const maxInputs = 10;

  useEffect(() => {
    fetch('https://be-devfolio.pockethost.io/api/collections/skills/records', {
      cache: 'no-store',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const { items } = data;
        const skills = items.map((item: any) => {
          return { 
            id: item.id,
            name: item.skills
          };
        });
        setPreFilledSkills(skills);
      })
      .catch((error) => {
        console.error('Error fetching pre-filled skills:', error);
      });
  }, []);


return (
    <Container>
        
        <Card>
            <CustomUnorderList>
                <Text>Things you're good at!</Text>
            </CustomUnorderList>
            
            <InnerCard>
                <TextGrey>The skills you mention here will help hackathon organizers in assessing you as a potential  participant.</TextGrey>
                
                <ListItem preFilledSkills={preFilledSkills} maxInputs={maxInputs} />
            </InnerCard>
            
        </Card>
        
    </Container>
)
}

export default DNDPage;