import styles from './ProductList.module.css'
export function ProductList(props){
    return (
        <>
            <div className={styles.List}>
                {props.children}
            </div>
        </>
    );
}