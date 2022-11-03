import { View } from "react-native"
import React, { useEffect, useState } from "react"
import { Marker, MarkerProps } from "react-native-maps"
import tw from "@/utils/tailwind"
import Avatar from "@/components/avatar/avatar"

interface Props extends MarkerProps {}
const data = [
  {
    id: 0,
    image:
      "https://img.freepik.com/premium-photo/young-handsome-man-with-beard-isolated-keeping-arms-crossed-frontal-position_1368-132662.jpg?w=2000",
  },
  {
    id: 1,
    image:
      "https://www.kindpng.com/picc/m/160-1600378_transparent-happy-person-png-happy-man-face-png.png",
  },
  {
    id: 2,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCJfSVBTQESlBZBmpd4ZYSHVLosaE4NcPq3w&usqp=CAU",
  },
  {
    id: 3,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzsctIbT76VnsVym56-RTaVG9HLlfhJ8lwvA&usqp=CAU",
  },
  {
    id: 4,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXTTF25V8zJE5Xz9Wzk7q7ZFEVrV9DYO2hLQ&usqp=CAU",
  },
  {
    id: 5,
    image:
      "https://img.freepik.com/premium-photo/young-handsome-man-with-beard-isolated-keeping-arms-crossed-frontal-position_1368-132662.jpg?w=2000",
  },
  {
    id: 6,
    image:
      "https://img.freepik.com/premium-photo/young-handsome-man-with-beard-isolated-keeping-arms-crossed-frontal-position_1368-132662.jpg?w=2000",
  },
  {
    id: 7,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR65CL9PUdWKzi3rPpuw4rMR9wGyWGrXA4PyA&usqp=CAU",
  },
]

const ImageMarker: React.FC<Props> = ({ coordinate }) => {
  const [shouldTrack, setTrack] = useState(false)
  useEffect(() => {
    setTrack(true)
    const timeuot = setTimeout(() => {
      setTrack(false)
    }, 300)
    return () => clearInterval(timeuot)
  }, [coordinate])

  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max)
  }
  const image = data[getRandomInt(7)].image

  return (
    <Marker tracksViewChanges={shouldTrack} coordinate={coordinate}>
      <View style={tw``}>
        <Avatar src={image} h={10} w={10} containerStyle="border-2 border-gray-400" />
      </View>
    </Marker>
  )
}

export default ImageMarker
