import { useEffect, useState } from 'react';

interface Tag {
  name: string;
}

const useTagOptions = (): Tag[] => {
  const [availableTags, setAvailableTags] = useState<Tag[]>([]);

  useEffect(() => {

        fetch(`https://api.stackexchange.com/2.3/tags/?order=desc&sort=popular&site=stackoverflow`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => {
            return res.json();
        }).then((data) => {
            const {items} = data;
            
            setAvailableTags(items);

            console.log(items);


        }).catch((err) => {
            console.log(err);

        })
    }, [])

  return availableTags;
};

export default useTagOptions;
