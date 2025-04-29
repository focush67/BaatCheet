import React, { useEffect, useState } from "react";
import { View, Text, Button, Alert } from "react-native";
import { requestMediaPermission } from "@/utilities/permissions/filePermissions";

const GalleryScreen = () => {
  const [permissionGranted, setPermissionGranted] = useState<boolean>(false);

  useEffect(() => {
    const checkPermissions = async () => {
      const hasPermission = await requestMediaPermission();
      setPermissionGranted(hasPermission);

      if (!hasPermission) {
        Alert.alert(
          "Permission Denied",
          "You need to grant permission to access your gallery."
        );
      }
    };

    checkPermissions();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {permissionGranted ? (
        <Text>Permission granted! Ready to access gallery.</Text>
      ) : (
        <Text>
          Permission not granted. Please enable it to use the gallery.
        </Text>
      )}
      <Button title="Retry Permission" onPress={requestMediaPermission} />
    </View>
  );
};

export default GalleryScreen;
