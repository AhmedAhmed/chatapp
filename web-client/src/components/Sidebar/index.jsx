import {Link} from 'react-router-dom';

import styles from './sidebar.module.scss';

const SideBar = props => {
    const renderChannelList = () => props.channels.map((channel, index) => (
        <li key={index}>
            <Link to={`/channel/${channel.name}`}>
                <span>#&emsp;{channel.name}</span>
            </Link>
        </li>
    ));

    return (
        <div className={styles.sidebar}>
            <div className={styles.title}>
                <h2>Channels</h2>
            </div>
            <ul className={styles.channels}>
                {renderChannelList()}
                <li>
                    <Link to="/create-channel" className={styles.link}>Create Channel</Link>
                </li>
            </ul>
        </div>
    );
}

export default SideBar;
