import styles from "../Components/css/footer.module.css";
export default function Footer1(completedtodos,totaltodos){
    return(
<div className={styles.footer}>
    console.log("completedTodos=" + completedtodos);
<span>Completed Tasks:{completedtodos}</span>
<span>Total Tasks:{totaltodos}</span>
</div>
    )
      


    
}