'use client'
import React, {useEffect, useState} from 'react'

import { Container, ListContainer, CustomUnorderList, Card, InnerCard,Text, BearerColumn, TextGrey } from './styles'
import ListItem from '@/components/listItem/listItem'
import InputItem from '@/components/inputItems/inputItems'
const DNDPage = () => {

    const [preFilledSkills, setPreFilledSkills] = useState<{ name: string }[]>([]);
    const maxInputs = 5;

  useEffect(() => {
    fetch('https://be-devfolio.pockethost.io/api/collections/skills/records', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const { items } = data;
        const skills = items.map((item: any) => {
          return { name: item.skills };
        });
        setPreFilledSkills(skills);
      })
      .catch((error) => {
        console.error('Error fetching pre-filled skills:', error);
      });
  }, []);

  const skillsColumn1 = preFilledSkills.slice(0, maxInputs);
  const skillsColumn2 = preFilledSkills.slice(maxInputs, maxInputs * 2);


    

    // useEffect(() => {
    //     fetch(`https://be-devfolio.pockethost.io/api/collections/skills/records`,{
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             "skills": "javascript"
    //         })
    //     }).then((res) => {
    //         return res.json();
    //     })
    // }, [])


return (
    <Container>
        
        <Card>
            <CustomUnorderList>
                <Text>Things you're good at!</Text>
            </CustomUnorderList>
            
            <InnerCard>
                <TextGrey>The skills you mention here will help hackathon organizers in assessing you as a potential  participant.</TextGrey>
                
                <ListContainer>
                            <BearerColumn>
                                <ListItem preFilledSkills={skillsColumn1} maxInputs={maxInputs} />
                                </BearerColumn>

                                <BearerColumn>
                                <ListItem preFilledSkills={skillsColumn2} maxInputs={maxInputs} />
                                </BearerColumn>
                </ListContainer>
            </InnerCard>
            
        </Card>
        
    </Container>
)
}

export default DNDPage;