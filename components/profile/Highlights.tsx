import HighlightItem from "@/components/story/HighlghtItem";
import HighlightModal from "@/components/story/HighlightsModal";
import { useTheme } from "@/context/ThemeContext";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import { handleHighlightCreation } from "@/hooks/story/useCreateHighlight";
import { useUser } from "@clerk/clerk-expo";
import { createNewHighlight } from "@/services/storyService";

const Highlights = ({ self }: { self: boolean }) => {
  const { colorScheme } = useTheme();
  const [showModal, setShowModal] = useState(false);
  const [highlightName, setHighlightName] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [highlights, setHighlights] = useState<THighlight[]>([]);
  const [loading, setLoading] = useState(false);

  const { user } = useUser();
  if (!user) {
    null;
  }

  const handleAddHighlight = async () => {
    if (loading) {
      return;
    }
    if (!highlightName.trim()) {
      alert("Please enter a highlight name");
      return;
    }

    if (!selectedImage) {
      alert("Please select an image");
      return;
    }

    const newHighlight: THighlight = {
      id: highlights.length + 2,
      name: highlightName,
      imageUri: selectedImage,
    };

    try {
      const email = user?.emailAddresses[0].emailAddress;
      if (!email) {
        throw new Error(`Misconfigured Clerk User`);
      }
      const response = await handleHighlightCreation({
        user: email,
        selectedImage,
        setLoading,
      });
      console.log("Upload Response", response);
      if (!response) {
        throw new Error(`Upload to supabase failed for highlghts`);
      }
      const creation = await createNewHighlight(
        highlightName,
        response?.publicUrl,
        email
      );

      console.log(`Story Creation ${creation}`);
      setHighlights([...highlights, newHighlight]);
    } catch (error: any) {
      console.log(`Error creating new highlight`, error);
      throw new Error("Error uploading new highlight", error);
    } finally {
      setSelectedImage(null);
      setShowModal(false);
      setHighlightName("");
    }
  };

  const defaultHighlights = [
    {
      id: 2,
      name: "Highlight 2",
      imageUri: "https://picsum.photos/70/70?random=2",
    },
    {
      id: 3,
      name: "Highlight 3",
      imageUri: "https://picsum.photos/70/70?random=3",
    },
    {
      id: 4,
      name: "Highlight 4",
      imageUri: "https://picsum.photos/70/70?random=4",
    },
  ];

  const allHighlights = [...defaultHighlights, ...highlights];

  return (
    <>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mt-6 px-4"
      >
        {self === true && (
          <HighlightItem
            id={1}
            onPress={() => setShowModal(true)}
            theme={colorScheme}
          />
        )}
        {allHighlights.map((highlight) => (
          <HighlightItem
            key={highlight.id}
            id={highlight.id}
            theme={colorScheme}
            imageUri={highlight.imageUri}
          />
        ))}
      </ScrollView>

      <HighlightModal
        visible={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedImage(null);
        }}
        onSubmit={handleAddHighlight}
        theme={colorScheme}
        highlightName={highlightName}
        setHighlightName={setHighlightName}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
    </>
  );
};

export default Highlights;
