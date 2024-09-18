import styles from "./TruckDetails.module.scss";

type TruckDetailsProps = {
    id: string
}

export default function TruckDetails({ id }: TruckDetailsProps) {

 
  return (
    <div className={styles.search}>
      <span>{id}</span>
      <span>Oi</span>
    </div>
  )
}