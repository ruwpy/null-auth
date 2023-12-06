import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import styles from "./otp.module.scss";

export const OtpPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.topPart}>
        <h1>2FA OTP</h1>
        <div className={styles.buttons}>
          <Input placeholder="Find password..." />
          <Button>Import account</Button>
          <Button>Export account</Button>
        </div>
      </div>
      {/* <Otp /> */}
    </div>
  );
};

const Otp = () => {
  return <div></div>;
};
