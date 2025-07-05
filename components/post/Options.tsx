import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import React from "react";
import Modal from "react-native-modal";

const screenHeight = Dimensions.get("window").height;

const Options = ({
  bottomSheetVisible,
  setBottomSheetVisible,
  colorScheme,
}: {
  bottomSheetVisible: boolean;
  setBottomSheetVisible: (_: boolean) => void;
  colorScheme: string;
}) => {
  const options = [
    {
      label: "Edit",
      onPress: () => console.log("Edit clicked"),
      color: colorScheme === "dark" ? "white" : "black",
    },
    {
      label: "Delete",
      onPress: () => console.log("Delete clicked"),
      color: "red",
    },
    {
      label: "Hide Like Count",
      onPress: () => console.log("Hide Like Count clicked"),
    },
    {
      label: "Hide Comment Count",
      onPress: () => console.log("Hide Comment Count clicked"),
    },
    {
      label: "Archive",
      onPress: () => console.log("Archive clicked"),
    },
    {
      label: "Turn Off Commenting",
      onPress: () => console.log("Turn Off Commenting clicked"),
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
        {options.map(
          ({
            label,
            onPress,
            color = colorScheme === "dark" ? "white" : "black",
          }) => (
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
                  color,
                }}
              >
                {label}
              </Text>
            </TouchableOpacity>
          )
        )}

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
              color: colorScheme === "dark" ? "white" : "black",
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
