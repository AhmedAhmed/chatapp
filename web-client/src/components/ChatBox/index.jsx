import {createRef, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Composer from '../Composer';
import styles from './chatbox.module.scss';

const ChatBox = props => {
    const msgList = createRef();

    // initial load
    useEffect(() => {
        msgList.current.scrollTop = msgList.current.scrollHeight;
    }, []);

    // only when messages changes
    useEffect(() => {
        msgList.current.scrollTop = msgList.current.scrollHeight;
    }, [props.messages]);


    const openRemoveUser = e => {
        e.preventDefault();
    }

    const renderUsers = () => props.users && props.users.map(user => (
        <Link to='/' style={{color:user.color}} onClick={openRemoveUser} className={styles.user} key={user.id}>
            <div className={styles.user__name}>{user.name}</div>
        </Link>
    ));

    const renderMessages = () => props.messages && props.messages.map(message => (
        <div className={styles.message} key={message.id}>
            <div className={styles.message__user} style={{color:message.user.color}}>{message.user.name}</div>
            <div className={styles.message__text}>{message.text}</div>
        </div>
    ));

    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <h3>#&emsp;{props.match.params.room}</h3>
            </div>
            <div className={styles.content}>
                <div className={styles.messages}>
                    <div ref={msgList} className={styles.messages__list}>
                        {renderMessages()}
                    </div>
                    <Composer
                        channel={props.match.params.room}
                        onSubmit={props.onSubmit}
                    />
                </div>
                <div className={styles.users}>
                    <h3>Online Now</h3>
                    {renderUsers()}
                </div>
            </div>
        </div>
    );
}

export default ChatBox;
