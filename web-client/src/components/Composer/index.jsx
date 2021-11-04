import styles from './composer.module.scss';

const Composer = props => {
    return (
        <div className={styles.composer}>
            <div className={styles.input}>
                <input type="text" placeholder={`Message #${props.channel}`} />
                {props.typing && <span className={styles.typing}>{props.typing}</span>}
            </div>
            <div className={styles.actions}>
                <div className={styles.send} onClick={props.onSubmit}>Send</div>
            </div>
        </div>
    );
}

export default Composer;
