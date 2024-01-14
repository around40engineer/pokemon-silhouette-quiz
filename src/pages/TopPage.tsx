import styles from './TopPage.module.scss'
import {useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';

export const TopPage = () => {
    const navigate = useNavigate()
    const [imgUrl, setImgUrl] = useState('gachaButton.png');
    const [isActionStart, setIsActionStart] = useState(false);
    const [videoUrl, setVideoUrl] = useState<string>();
    const videoRef = useRef<HTMLVideoElement>(null)
    const randomSelectMonsterBall = () => {
        const probability = Math.floor(Math.random()*100)
        // 3-❼
        if(probability>90){
            setVideoUrl('gachaActionMaster.mov')
        } else if (probability>70){
            setVideoUrl('gachaActionHyper.mov')
        } else if (probability>40){
            setVideoUrl('gachaActionSuper.mov')
        } else {
            setVideoUrl('gachaAction.mov')
        }
    }

    useEffect(() => {
        randomSelectMonsterBall()
    }, []);

    useEffect(() => {
        if(videoUrl){
            videoRef.current?.play()
        }
    }, [isActionStart]);

    return (
        <>
            {isActionStart ||
                <div className={styles.top}>
                    <img id={styles.initialScreen} src='start.png' alt='start'/>
                    <button id={styles.gachaButton} type='button'>
                        <img
                            id={styles.gachaButtonImg}
                            onMouseEnter={() => {setImgUrl('gachaButtonHover.png')}}
                            onMouseLeave={() => {setImgUrl('gachaButton.png')}}
                            onClick={() => {setIsActionStart(true)}}
                            src={imgUrl}
                            alt="button" />
                    </button>
                </div>
            }
            {isActionStart &&
                <video className={styles.gachaAction} ref = {videoRef} src={videoUrl} onEnded={() => {
                    navigate('/pokemon-silhouette-quiz/quiz')
                }}/>
            }
        </>

    )
}