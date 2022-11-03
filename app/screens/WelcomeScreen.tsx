import { observer } from "mobx-react-lite"
import React, {
  FC,
  useLayoutEffect, // @demo remove-current-line
} from "react"
import { View, Text } from "react-native"

import {
  Header,
  Screen, // @demo remove-current-line
} from "../components"
import { useStores } from "../models" // @demo remove-current-line
import { AppStackScreenProps } from "../navigators" // @demo remove-current-line
import { colors } from "../theme"

interface WelcomeScreenProps extends AppStackScreenProps<"Welcome"> {} // @demo remove-current-line

export const WelcomeScreen: FC<WelcomeScreenProps> = observer(function WelcomeScreen(
  _props, // @demo remove-current-line
) {
  // @demo remove-block-start
  const { navigation } = _props
  const {
    authenticationStore: { logout },
  } = useStores()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <Header rightTx="common.logOut" onRightPress={logout} />,
    })
  }, [])
  // @demo remove-block-end

  return (
    <Screen
      preset="auto"
      safeAreaEdges={["top", "bottom"]}
      backgroundColor={colors.background}
    ></Screen>
  )
})
