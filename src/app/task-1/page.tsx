'use client'
import React, {useEffect, useState} from 'react'

import { Container, ListContainer, CustomUnorderList, Card, InnerCard,Text, BearerColumn, TextGrey } from './styles'
import ListItem from '@/components/listItem/listItem'
import { Tag, tags } from '@/app/assets/data';

const DNDPage = () => {

  const [tagElements, setTagElements] = useState<Tag[]>(tags);
  const maxTagsCount = 10;
  const filledTagsCount = tags.length;

  const firstColumnTagsCount = Math.min(filledTagsCount, maxTagsCount / 2);
  const firstColumnTags = tags.slice(0, firstColumnTagsCount);

  const secondColumnTagsCount = Math.min(filledTagsCount - firstColumnTagsCount, maxTagsCount / 2);
  const secondColumnTags = tags.slice(firstColumnTagsCount, firstColumnTagsCount + secondColumnTagsCount);

  const placeholderTagsCount = Math.max(maxTagsCount - filledTagsCount, 0);

  const placeholderTags = Array.from({ length: placeholderTagsCount }, (_, index) => ({
    id: filledTagsCount + index + 1,
    name: 'Add Skill',
  }));

  const allTags = [...firstColumnTags, ...placeholderTags, ...secondColumnTags];

  const handleTagUpdate = (updatedTag: Tag) => {
    const tagIndex = tagElements.findIndex((tag) => tag.id === updatedTag.id);

    if (tagIndex !== -1) {
      const updatedTags = [...tagElements];
      updatedTags[tagIndex] = updatedTag;
      setTagElements(updatedTags);
    }
  };
  

    // useEffect(() => {

    //     fetch(`https://api.stackexchange.com/2.3/tags/javascript/?order=desc&sort=popular&site=stackoverflow`,{
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     }).then((res) => {
    //         return res.json();
    //     }).then((data) => {
    //         const {items} = data;
    //         const names = items.map((item: any) => {
    //             return item.name;
    //         }

    //         )
    //         console.log(names);


    //     }).catch((err) => {
    //         console.log(err);

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
                    {allTags.slice(0, maxTagsCount / 2).map((tag: Tag, index: number) => (
                        <ListItem
                        key={tag.id}
                        tag={tag}
                        itemNumber={index + 1}
                        isplaceholder={tag.name === 'Add Skill'}
                        handleTagUpdate={handleTagUpdate}
                        />
                    ))}
                    </BearerColumn>
                    <BearerColumn>
                    {allTags.slice(maxTagsCount / 2, maxTagsCount).map((tag: Tag, index: number) => (
                        <ListItem
                        key={tag.id}
                        tag={tag}
                        itemNumber={firstColumnTagsCount + index + 1}
                        isplaceholder={tag.name === 'Add Skill'}
                        handleTagUpdate={handleTagUpdate}
                        />
                    ))}
                    </BearerColumn>
                </ListContainer>
            </InnerCard>
        </Card>
    </Container>
)
}

export default DNDPage;