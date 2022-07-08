import React, { useRef, useState } from 'react'
import { FlatList, ViewToken } from 'react-native'
import { Photos } from '../../model/cars';
import { 
  Container,
  ImageIndexes,
  ImageIndex,
  ImageWrapper,
  CardImage,
} from './styles'

interface Props{
  imageUrl: Photos[]
}

interface ChangeImageProps{
  viewableItems: ViewToken[];
  changed: ViewToken[];
}
export default function ImageSlider({ imageUrl }:Props) {
  const [imageIndex, setImageIndex] = useState(0)

  const indexChange = useRef((info: ChangeImageProps) => {
    const index = info.viewableItems[0].index!
    setImageIndex(index)
  })

  return (
    <Container>
        <ImageIndexes>
          {
            imageUrl.map((item, index) => {
              return <ImageIndex active={imageIndex === index} key={item.id}/>
            })
          }
        </ImageIndexes>

        
          <FlatList
            data={imageUrl}
            keyExtractor={key => key.id}
            renderItem={({item}) => 
              <ImageWrapper>
                <CardImage source={{ uri: item.photo }} resizeMode='contain'/>
              </ImageWrapper>
            }
            horizontal
            showsHorizontalScrollIndicator={false}
            onViewableItemsChanged={indexChange.current}
          />
    </Container>
  )
}