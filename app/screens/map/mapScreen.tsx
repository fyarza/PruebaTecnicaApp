import React, { FC, useCallback, useEffect, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "@/navigators"
import { Platform, View, Text } from "react-native"
import tw from "@/utils/tailwind"
import randomLocation from "random-location"
import MapView, { AnimatedRegion, MarkerAnimated, PROVIDER_GOOGLE } from "react-native-maps"
import _ from "lodash"
import { SafeAreaView } from "react-native-safe-area-context"
import useCurrentLocation from "./Hooks/useCurrentLocation"
import MapStyle from "./StyleMap/style.json"
import ImageMarker from "./Markers"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// @ts-ignore
export const MapScreen: FC<StackScreenProps<AppStackScreenProps, "Map">> = observer(
  function MapScreen() {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()

    // Pull in navigation via hook
    // const navigation = useNavigation()
    const [markers, setMarkers] = useState([])
    const { onMapLoaded, setMap, INITIAL_REGION } = useCurrentLocation()
    const [region, setRegion] = useState({
      latitude: 37.78825,
      longitude: -122.4324,
    })
    const coordinate = useRef(
      new AnimatedRegion({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
      }),
    ).current

    const onChangeLocation = useCallback(
      _.debounce(
        (region) => {
          console.log("debounce region", region)
          const locations = new Array(20).fill(undefined).map(() => {
            const R = 4000 // Meters

            const randomPoint = randomLocation.randomCirclePoint(region, R)
            return randomPoint
          })
          setMarkers(locations)
        },
        3000,
        { trailing: true, leading: false },
      ),
      [],
    )

    useEffect(() => {
      onChangeLocation(region)
    }, [region])

    const onRegionChange = (newRegion: any) => {
      setRegion(newRegion)
    }

    console.log("Markes", markers)
    return (
      <SafeAreaView style={tw`flex-1 bg-white`}>
        <Text style={tw`text-2xl text-black text-center mt-5`}>Prueba de punto aleatorios</Text>
        <Text style={tw`text-base text-gray-500 text-center mt-3`}>
          Los puntos cambia cuando cambia la Region que se esta visualizando
        </Text>
        <View style={tw`flex-1 px-3 py-5 android:mt-3 ios:mt-5`}>
          <View style={tw`border border-[#E6285B] flex-1 mt-5 rounded-xl overflow-hidden`}>
            <MapView
              ref={(ref) => setMap(ref)}
              onRegionChangeComplete={onRegionChange}
              onMapLoaded={() => {
                if (Platform.OS === "android") {
                  onMapLoaded().then()
                }
                return null
              }}
              onLayout={() => {
                if (Platform.OS === "ios") {
                  onMapLoaded().then()
                }
                return null
              }}
              style={tw`flex-1`}
              showsMyLocationButton={true}
              showsUserLocation={true}
              provider={PROVIDER_GOOGLE}
              initialRegion={INITIAL_REGION}
              mapType="standard"
              customMapStyle={MapStyle}
            >
              <MarkerAnimated coordinate={coordinate} />
              {/* Faker locations */}
              {markers.map((point, index) => (
                <ImageMarker
                  key={index}
                  coordinate={{
                    latitude: Number(point.latitude),
                    longitude: Number(point.longitude),
                  }}
                />
              ))}
            </MapView>
          </View>
        </View>
      </SafeAreaView>
    )
  },
)
