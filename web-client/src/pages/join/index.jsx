import { Formik } from "formik";

import styles from './join.module.scss';

const JoinPage = props => {
    return (
        <div className={styles.main}>
            <Formik
                initialValues={{}}
                onSubmit={values => {
                    props.onSubmit(values);
                    props.history.push('/');
                }}
            >
                {({values, handleChange, handleSubmit}) => (
                    <form onSubmit={handleSubmit}>
                        <h1 className={styles.header}>Join Chat</h1>
                        <input
                            type="text"
                            name='user'
                            className={styles.input}
                            value={values.name}
                            onChange={handleChange}
                            placeholder='Nickname'
                        />
                        <button className={styles.button}>Create</button>
                    </form>
                )}
            </Formik>
        </div>
    );
};

export default JoinPage;
