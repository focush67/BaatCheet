import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";

interface EditPostModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (newCaption: string) => void;
  initialCaption: string;
  profileImage: string;
  colorScheme: "light" | "dark";
  postImage: string;
}

const EditPostModal = ({
  visible,
  onClose,
  onSave,
  initialCaption,
  profileImage,
  colorScheme,
  postImage,
}: EditPostModalProps) => {
  const [caption, setCaption] = useState(initialCaption);

  useEffect(() => {
    setCaption(initialCaption);
  }, [visible, initialCaption]);

  const isDark = colorScheme === "dark";
  const bgColor = isDark ? "bg-[#121212]" : "bg-white";
  const textColor = isDark ? "text-white" : "text-black";
  const borderColor = isDark ? "border-white/10" : "border-gray-200";
  const placeholderColor = isDark ? "#aaa" : "#666";

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropOpacity={1}
      backdropColor={isDark ? "#121212" : "#fff"}
      useNativeDriver
      style={{ justifyContent: "center", margin: 0 }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className={`flex-1 justify-center items-center ${bgColor}`}
      >
        <View className="w-full max-w-md h-[90%] rounded-2xl overflow-hidden">
          {/* Header */}
          <View
            className={`flex-row justify-between items-center px-4 py-3 border-b ${borderColor}`}
          >
            <TouchableOpacity onPress={onClose}>
              <Ionicons
                name="close"
                size={24}
                color={isDark ? "white" : "black"}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onSave(caption)}>
              <Ionicons
                name="checkmark"
                size={28}
                color={isDark ? "white" : "black"}
              />
            </TouchableOpacity>
          </View>

          <ScrollView
            className="flex-1"
            contentContainerStyle={{ paddingBottom: 20 }}
            keyboardShouldPersistTaps="handled"
          >
            <View className="w-full aspect-[4/3]">
              <Image
                source={{ uri: postImage }}
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>

            <View className={`flex-row p-4 border-t ${borderColor}`}>
              <Image
                source={{ uri: profileImage }}
                className="w-10 h-10 rounded-full mr-3"
              />
              <TextInput
                multiline
                placeholder="Edit your caption..."
                placeholderTextColor={placeholderColor}
                value={caption}
                onChangeText={setCaption}
                textAlignVertical="top"
                className={`flex-1 min-h-[100px] text-base pt-1 ${textColor}`}
              />
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default EditPostModal;
