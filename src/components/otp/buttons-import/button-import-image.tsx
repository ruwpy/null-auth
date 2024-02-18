import { cn } from "@/lib/utils";
import { Button } from "../../ui/button";
import { Icons } from "../../ui/icons";
import styles from "./button.module.scss";
import { useEffect, useState } from "react";

export const ImportImageButton = ({ importFn }: { importFn: (file: File) => void }) => {
  const [files, setFiles] = useState<FileList | null>(null);

  useEffect(() => {
    if (files) importFn(files[0]);
  }, [files]);

  return (
    <Button variant="blank" className={cn(styles.imageImport, styles.button)}>
      <Icons.picture width={32} height={32} />
      <span>Select an image</span>
      <label htmlFor="imageInput"></label>
      <input
        id="imageInput"
        type="file"
        accept="image/*"
        onChange={(e) => setFiles(e.target.files)}
      />
    </Button>
  );
};
