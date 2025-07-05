import { useUser } from "@clerk/clerk-expo";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import Modal from "react-native-modal";

interface OptionProps {
  bottomSheetVisible: boolean;
  setBottomSheetVisible: (value: boolean) => void;
  onEdit: () => void;
  colorScheme: "light" | "dark";
  postOwner: string;
}

const Options = ({
  bottomSheetVisible,
  setBottomSheetVisible,
  onEdit,
  colorScheme,
  postOwner,
}: OptionProps) => {
  const baseColor = colorScheme === "dark" ? "white" : "black";
  const { user } = useUser();
  if (!user) {
    return null;
  }
  const sessionUser = user.unsafeMetadata?.username;

  const options = [
    {
      label: "Edit",
      onPress: onEdit,
      color: baseColor,
      visible: sessionUser === postOwner,
    },
    {
      label: "Delete",
      onPress: () => console.log("Delete clicked"),
      color: "red",
      visible: sessionUser === postOwner,
    },
    {
      label: "Hide Like Count",
      onPress: () => console.log("Hide Like Count clicked"),
      visible: sessionUser === postOwner,
    },
    {
      label: "Hide Comment Count",
      onPress: () => console.log("Hide Comment Count clicked"),
      visible: sessionUser === postOwner,
    },
    {
      label: "Archive",
      onPress: () => console.log("Archive clicked"),
      visible: sessionUser === postOwner,
    },
    {
      label: "Turn Off Commenting",
      onPress: () => console.log("Turn Off Commenting clicked"),
      visible: sessionUser === postOwner,
    },
  ];

  return (
    <Modal
      isVisible={bottomSheetVisible}
      onBackdropPress={() => setBottomSheetVisible(false)}
      onSwipeComplete={() => setBottomSheetVisible(false)}
      swipeDirection="down"
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropTransitionOutTiming={0}
      deviceWidth={Dimensions.get("window").width}
      deviceHeight={Dimensions.get("window").height}
      style={{
        justifyContent: "flex-end",
        margin: 0,
      }}
    >
      <View
        style={{
          backgroundColor: colorScheme === "dark" ? "#1e1e1e" : "#fff",
          paddingTop: 12,
          paddingBottom: 8,
          paddingHorizontal: 20,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          elevation: 10,
        }}
      >
        {options
          .filter((option) => option.visible !== false)
          .map(({ label, onPress, color }) => (
            <TouchableOpacity
              key={label}
              onPress={() => {
                onPress();
                setBottomSheetVisible(false);
              }}
              style={{
                paddingVertical: 14,
                borderBottomWidth: 1,
                borderBottomColor: colorScheme === "dark" ? "#333" : "#ddd",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "600",
                  fontSize: 16,
                  color: color ?? baseColor,
                }}
              >
                {label}
              </Text>
            </TouchableOpacity>
          ))}

        <TouchableOpacity
          onPress={() => setBottomSheetVisible(false)}
          style={{
            marginTop: 12,
            backgroundColor: colorScheme === "dark" ? "#333" : "#f0f0f0",
            paddingVertical: 14,
            borderRadius: 12,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 15,
              fontWeight: "500",
              color: baseColor,
            }}
          >
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default Options;
