import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import styles from "./passwords.module.scss";

export const PasswordsPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.topPart}>
        <h1>Passwords</h1>
        <div className={styles.buttons}>
          <Input placeholder="Find account..." />
          <Button>Add account</Button>
        </div>
      </div>
      {/* <Passwords /> */}
    </div>
  );
};

const Passwords = () => {
  return <div></div>;
};
