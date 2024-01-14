import styles from './TopPage.module.scss'
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

export const TopPage = () => {
    const navigate = useNavigate()
    const [imgUrl, setImgUrl] = useState('gachaButton.png');
    return (
        <div className={styles.top}>
            <img id={styles.initialScreen} src='start.png' alt='start'/>
            <button id={styles.gachaButton} type='button'>
                <img
                    id={styles.gachaButtonImg}
                    onMouseEnter={() => {setImgUrl('gachaButtonHover.png')}}
                    onMouseLeave={() => {setImgUrl('gachaButton.png')}}
                    onClick={() => {navigate('/pokemon-silhouette-quiz/action')}}
                    src={imgUrl}
                    alt="button" />
            </button>
        </div>
    )
}