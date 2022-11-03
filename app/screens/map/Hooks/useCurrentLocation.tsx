import { useState } from "react"
import MapView from "react-native-maps"
import * as Location from "expo-location"

const latitudeDelta = 0.0922
const longitudeDelta = 0.0421

const INITIAL_REGION = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta,
  longitudeDelta,
}

const useCurrentLocation = (camera = true) => {
  const [mapLoaded, setMapLoaded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [currentLocation, setCurrentLocation] = useState(null)
  const [map, setMap] = useState<MapView | null>(null)

  const getCurrentLocation = async () => {
    try {
      const last = await Location.getLastKnownPositionAsync()
      __DEV__ && console.log("last", JSON.stringify(last))
      if (last) {
        const { latitude, longitude } = last.coords
        setCurrentLocation(last)

        if (map && camera) {
          map.animateCamera(
            {
              center: { latitude, longitude },
              pitch: 4,
            },
            { duration: 750 },
          )
        }
      } else {
        __DEV__ && console.log("Current Iniciado")
        const current = await Location.getCurrentPositionAsync()
        if (current) {
          const { latitude, longitude } = current.coords
          setCurrentLocation(current)

          if (map && camera) {
            map.animateCamera(
              {
                center: { longitude, latitude },
                pitch: 4,
              },
              {
                duration: 750,
              },
            )
          }
        }
      }
    } catch (error) {}
  }

  const onMapLoaded = async () => {
    try {
      setLoading(true)
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status === "granted") {
        await getCurrentLocation()
        setMapLoaded(true)
      }
      setLoading(false)
    } catch (error) {
      __DEV__ && console.log(error.message)
    }
  }
  return {
    map,
    INITIAL_REGION,
    mapLoaded,
    loading,
    currentLocation,
    setMap,
    onMapLoaded,
  }
}

export default useCurrentLocation
