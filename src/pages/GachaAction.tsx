import {useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import styles from './GachaAction.module.scss'
export const GachaAction = () => {
    const navigate = useNavigate()
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
    }, [videoUrl]);

    if(videoUrl && videoRef){
        return (
            <video className={styles.gachaAction} ref = {videoRef} src={videoUrl} onEnded={() => {
                navigate('/pokemon-silhouette-quiz/status')
            }}/>
        )
    }
}