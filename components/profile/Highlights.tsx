import HighlightItem from "@/components/story/HighlghtItem";
import HighlightModal from "@/components/story/HighlightsModal";
import { useTheme } from "@/context/ThemeContext";
import React, { useState } from "react";
import { ScrollView } from "react-native";

const Highlights: React.FC = () => {
  const { colorScheme } = useTheme();
  const [showModal, setShowModal] = useState(false);
  const [highlightName, setHighlightName] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [highlights, setHighlights] = useState<THighlight[]>([]);

  const handleAddHighlight = () => {
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

    setHighlights([...highlights, newHighlight]);
    setShowModal(false);
    setHighlightName("");
    setSelectedImage(null);
  };

  // Default highlights (can be replaced with actual data)
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
        <HighlightItem
          id={1}
          onPress={() => setShowModal(true)}
          theme={colorScheme}
        />
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
