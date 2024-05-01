import { ChangeEvent, useRef } from "react";
import axiosInstance from "../axiosInstance";
import { setImage } from "kyz-editor";

const useS3ImageEditor = () => {
  const setImageRef = useRef<setImage | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const insertImageEditor = (setImage: setImage) => {
    if (fileRef.current) {
      setImageRef.current = setImage;
      fileRef.current.click();
    }
  };

  const handleImage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (fileRef.current && e.target.files?.[0]) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("images", file);
      try {
        const result = await axiosInstance.post(`/api/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (setImageRef.current) {
          setImageRef.current({ src: result.data.url, altText: "" });
        }
        fileRef.current.value = "";
      } catch (error) {
        fileRef.current.value = "";
      }
    }
  };

  return { fileRef, handleImage, insertImageEditor };
};

export default useS3ImageEditor;
