import styles from "./settings.module.scss";
import packageJson from "../../../package.json";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export const SettingsPage = () => {
  const [isUpdateAvailable, setUpdateAvailable] = useState(true);

  return (
    <div className={styles.container}>
      <div className={styles.topPart}>
        <h1>Settings</h1>
        <div className={styles.buttons}>
          {isUpdateAvailable && <Button>Update available</Button>}
          <span className={styles.version}>null-auth version: {packageJson.version}</span>
        </div>
      </div>
      {/* <Passwords /> */}
    </div>
  );
};

const Password = () => {
  return <div></div>;
};
