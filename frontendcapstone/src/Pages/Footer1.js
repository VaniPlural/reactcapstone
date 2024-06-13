import styles from "../Components/css/footer.module.css";
export default function Footer1(props){
    let {completedTodos, totalTodos} = props;
    return(
<div className={styles.footer}>
<span>Completed Tasks:{completedTodos}</span><br></br>
<span>Total Tasks:{totalTodos}</span>
</div>
    )
      


    
}