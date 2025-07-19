import { useUser } from "@clerk/clerk-expo";
import React, { useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";

interface OptionProps {
  bottomSheetVisible: boolean;
  setBottomSheetVisible: (value: boolean) => void;
  onEdit: () => void;
  colorScheme: "light" | "dark";
  postOwner: string;
  followStatus: boolean;
  onFollowToggle?: () => void;
}

const ActionButton = React.memo(
  ({
    icon,
    label,
    color,
    onPress,
  }: {
    icon: string;
    label: string;
    color: string;
    onPress: () => void;
  }) => (
    <TouchableOpacity
      onPress={onPress}
      style={{ alignItems: "center", gap: 4 }}
    >
      <Ionicons name={icon as any} size={24} color={color} />
      <Text style={{ fontSize: 12, color }}>{label}</Text>
    </TouchableOpacity>
  )
);

const OptionItem = React.memo(
  ({
    option,
    baseColor,
    colorScheme,
    onPress,
  }: {
    option: any;
    baseColor: string;
    colorScheme: "light" | "dark";
    onPress: () => void;
  }) => (
    <TouchableOpacity
      onPress={onPress}
      style={{
        paddingVertical: 14,
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        paddingHorizontal: 20,
        borderBottomWidth: 0.5,
        borderBottomColor: colorScheme === "dark" ? "#333" : "#ddd",
      }}
    >
      <Ionicons
        name={option.icon as any}
        size={20}
        color={option.color ?? baseColor}
      />
      <Text
        style={{
          fontWeight: "600",
          fontSize: 16,
          color: option.color ?? baseColor,
        }}
      >
        {option.label}
      </Text>
    </TouchableOpacity>
  )
);

const Options = React.memo(
  ({
    bottomSheetVisible,
    setBottomSheetVisible,
    onEdit,
    colorScheme,
    postOwner,
    followStatus,
    onFollowToggle,
  }: OptionProps) => {
    const baseColor = colorScheme === "dark" ? "white" : "black";
    const { user } = useUser();

    if (!user) return null;

    const sessionUser = user.unsafeMetadata?.username;

    // Memoized styles and options
    const modalStyle = useMemo(
      () => ({
        backgroundColor: colorScheme === "dark" ? "#1e1e1e" : "#fff",
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        paddingBottom: 10,
        maxHeight: Dimensions.get("window").height * 0.7,
      }),
      [colorScheme]
    );

    const { primaryActions, options } = useMemo(() => {
      const primaryActions = [
        {
          label: "Save",
          icon: "bookmark-outline",
          onPress: () => console.log("Save post"),
        },
        {
          label: "Show QR Code",
          icon: "qr-code-outline",
          onPress: () => console.log("Show QR code"),
        },
      ];

      const options = [
        {
          label: "Edit",
          icon: "create-outline",
          onPress: onEdit,
          color: baseColor,
          visible: sessionUser === postOwner,
        },
        {
          label: "Delete",
          icon: "trash-outline",
          onPress: () => console.log("Delete clicked"),
          color: "red",
          visible: sessionUser === postOwner,
        },
        {
          label: "Hide Like Count",
          icon: "eye-off-outline",
          onPress: () => console.log("Hide Like Count clicked"),
          visible: sessionUser === postOwner,
        },
        {
          label: "Hide Comment Count",
          icon: "chatbubble-ellipses-outline",
          onPress: () => console.log("Hide Comment Count clicked"),
          visible: sessionUser === postOwner,
        },
        {
          label: "Archive",
          icon: "archive-outline",
          onPress: () => console.log("Archive clicked"),
          visible: sessionUser === postOwner,
        },
        {
          label: "Turn Off Commenting",
          icon: "remove-circle-outline",
          onPress: () => console.log("Turn Off Commenting clicked"),
          visible: sessionUser === postOwner,
        },
        {
          label: followStatus ? "Unfollow" : "Follow",
          icon: followStatus ? "person-remove-outline" : "person-add-outline",
          onPress: () => {
            onFollowToggle?.();
            setBottomSheetVisible(false);
          },
          visible: sessionUser !== postOwner,
        },
        {
          label: "Report",
          icon: "flag-outline",
          onPress: () => console.log("Report clicked"),
          visible: sessionUser !== postOwner,
        },
        {
          label: "Hide",
          icon: "eye-off-outline",
          onPress: () => console.log("Hide clicked"),
          visible: sessionUser !== postOwner,
        },
      ];

      return { primaryActions, options };
    }, [
      colorScheme,
      postOwner,
      sessionUser,
      followStatus,
      onEdit,
      onFollowToggle,
    ]);

    const visibleOptions = useMemo(
      () => options.filter((option) => option.visible !== false),
      [options]
    );

    return (
      <Modal
        isVisible={bottomSheetVisible}
        onBackdropPress={() => setBottomSheetVisible(false)}
        onSwipeComplete={() => setBottomSheetVisible(false)}
        swipeDirection="down"
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropOpacity={0.2}
        backdropColor="black"
        deviceWidth={Dimensions.get("window").width}
        deviceHeight={Dimensions.get("window").height}
        style={{ justifyContent: "flex-end", margin: 0 }}
      >
        <View style={modalStyle}>
          <View
            style={{
              alignSelf: "center",
              width: 40,
              height: 4,
              backgroundColor: colorScheme === "dark" ? "#333" : "#ddd",
              borderRadius: 2,
              marginVertical: 8,
            }}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginBottom: 12,
              paddingHorizontal: 20,
            }}
          >
            {primaryActions.map(({ label, icon, onPress }) => (
              <ActionButton
                key={label}
                icon={icon}
                label={label}
                color={baseColor}
                onPress={() => {
                  onPress();
                  setBottomSheetVisible(false);
                }}
              />
            ))}
          </View>

          <ScrollView>
            {visibleOptions.map((option) => (
              <OptionItem
                key={option.label}
                option={option}
                baseColor={baseColor}
                colorScheme={colorScheme}
                onPress={() => {
                  option.onPress();
                  setBottomSheetVisible(false);
                }}
              />
            ))}
          </ScrollView>

          <TouchableOpacity
            onPress={() => setBottomSheetVisible(false)}
            style={{
              margin: 16,
              backgroundColor: colorScheme === "dark" ? "#333" : "#f0f0f0",
              paddingVertical: 14,
              borderRadius: 8,
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
  }
);

export default Options;
