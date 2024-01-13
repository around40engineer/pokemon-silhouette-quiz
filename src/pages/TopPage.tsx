import styles from './TopPage.module.scss'
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

export const TopPage = () => {
    const navigate = useNavigate()
    const [imgUrl, setImgUrl] = useState('../../public/gachaButton.png');
    return (
        <div className={styles.top}>
            <img id={styles.initialScreen} src='../../public/start.png' alt='start'/>
            <button id={styles.gachaButton} type='button'>
                <img
                    id={styles.gachaButtonImg}
                    onMouseEnter={() => {setImgUrl('../../public/gachaButtonHover.png')}}
                    onMouseLeave={() => {setImgUrl('../../public/gachaButton.png')}}
                    onClick={() => {navigate('/pokemon-silhouette-quiz/action')}}
                    src={imgUrl}
                    alt="button" />
            </button>
        </div>
    )
}