import { insertImage } from "./ImageButton";
import imageExtensions from "image-extensions";
import isUrl from "is-url";

export const withImages = editor => {
    const { insertData, isVoid } = editor;
  
    editor.isVoid = element => {
      return element.type === "image" ? true : isVoid(element);
    };
  
    editor.insertData = data => {
      const text = data.getData("text/plain");
      const { files } = data;
  
      if (files && files.length > 0) {
        for (const file of files) {
          const reader = new FileReader();
          const [mime] = file.type.split("/");
          console.log("image is: ", file);
          if (mime === "image") {
            reader.addEventListener("load", () => {
              const url = reader.result;
              insertImage(editor, url);
            });
  
            reader.readAsDataURL(file);
          }
        }
      } else if (isImageUrl(text)) {
        console.log("tets");
        insertImage(editor, text);
      } else {
        insertData(data);
      }
    };
  
    return editor;
  };
  
  const isImageUrl = url => {
    console.log("test");
    if (!url) return false;
    if (!isUrl(url)) return false;
    const ext = new URL(url).pathname.split(".").pop();
    return imageExtensions.includes(ext);
  };