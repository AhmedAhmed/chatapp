import { Formik } from 'formik';

import style from './create_channel.module.scss';

const CreateChannel = props => {
    const handleSubmit = values => {
        props.onSubmit(values);
        props.history.push(`/channel/${values.name}`)
    }
    return (
        <div className={style.main}>
            <div className={style.form}>
                <Formik
                    initialValues={{
                        name: '',
                    }}
                    onSubmit={handleSubmit}
                >
                    {({values, handleChange, handleSubmit}) => (
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="name"
                                className={style.input}
                                onChange={handleChange}
                                placeholder="Channel Name"
                                value={values.name}
                            />
                            <button className={style.button}>Create</button>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default CreateChannel;
