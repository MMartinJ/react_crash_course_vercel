import styles from './ProductList.module.css'

export function ProductList(props){
    return (
        <>
            <hr></hr>
            <div className={styles.List}>
                {props.children}
            </div>
        </>
    );
}