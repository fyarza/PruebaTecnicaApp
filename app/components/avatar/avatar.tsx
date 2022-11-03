import tw from "@/utils/tailwind"
import * as React from "react"
import { View, Text, TouchableOpacity, ImageBackground } from "react-native"

export interface AvatarProps {
  name?: string
  txtSize?: string
  h: number | null
  w: number | null
  src?: string
  onPress?: () => void
  containerStyle?: string
}

const getRandomColor = (value: string) => {
  const firstLetter = value.charAt(0)
  if (firstLetter === "A" || firstLetter === "B" || firstLetter === "C") {
    return "#d73d32"
  }
  if (firstLetter === "D" || firstLetter === "E" || firstLetter === "F") {
    return "#7e3794"
  }
  if (firstLetter === "G" || firstLetter === "H" || firstLetter === "I") {
    return "#4285f4"
  }
  if (firstLetter === "J" || firstLetter === "K" || firstLetter === "L") {
    return "#67ae3f"
  }
  if (firstLetter === "M" || firstLetter === "N" || firstLetter === "O") {
    return "#556B2F"
  }
  if (firstLetter === "P" || firstLetter === "Q" || firstLetter === "R") {
    return "#ff4080"
  }
  if (firstLetter === "S" || firstLetter === "T" || firstLetter === "U") {
    return "#00008b"
  }
  if (firstLetter === "V" || firstLetter === "W" || firstLetter === "X") {
    return "#23395d"
  }
  if (firstLetter === "Y" || firstLetter === "Z") {
    return "#BC8F8F"
  }
  if (firstLetter === "Ñ") {
    return "#FFFF00"
  }

  return null
}

const getInitials = (name: string) => {
  const [firstName, lastName] = name.split(" ")

  if (firstName && lastName) {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
  }

  return firstName.charAt(0).toUpperCase()
}

const Avatar: React.FC<AvatarProps> = ({ name, w, h, txtSize, src, onPress, containerStyle }) => {
  let color

  if (name) {
    const initials = getInitials(name)
    color = getRandomColor(initials)
  }
  if (src) {
    return (
      <TouchableOpacity onPress={onPress}>
        <View
          style={tw.style(
            `w-${w ?? 14} h-${h ?? 14} rounded-full overflow-hidden items-center justify-center`,
            containerStyle,
          )}
        >
          <ImageBackground
            source={{ uri: src }} // image address
            style={tw`w-${w ?? 14} h-${h ?? 14}`} // your custom style object
            // any supported props by Image
            resizeMode="cover"
          />
        </View>
      </TouchableOpacity>
    )
  } else {
    return (
      <TouchableOpacity onPress={onPress}>
        <View
          style={tw.style(
            `rounded-full text-white font-medium w-${w ?? 14} h-${h ?? 14} bg-[${
              color ?? "#d73d32"
            }]`,
            containerStyle,
          )}
        >
          <View style={tw`flex items-center justify-center h-full`}>
            <Text style={tw`text-white text-${txtSize ?? "sm"}`}>{getInitials(name ?? "")}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

Avatar.defaultProps = {
  h: 14,
  w: 14,
  txtSize: "",
  name: "",
  src: "",
  onPress: () => console.log("hello word"),
}
export default Avatar
