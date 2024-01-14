import {useEffect, useState} from 'react';
import style from './SilhouetteQuizPage.module.scss'
import {Link} from 'react-router-dom';

export const SilhouetteQuizPage = () => {
    const [pokemonId] = useState(Math.floor(Math.random()*1010));
    const [pokemon, setPokemon] = useState();
    const [pokemonImg, setPokemonImg] = useState<string>();

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
            .then(res=>res.json()
                .then(resJson => setPokemon(resJson)))
    }, []);

    useEffect(() => {
        if(pokemon) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            fetch(pokemon.sprites.other.home.front_default)
                .then(res => res.blob()
                    .then(resBlob => setPokemonImg(URL.createObjectURL(resBlob))))
        }
    }, [pokemon]);

    if(pokemonImg){
        return (
            <div className={style.pokemonSilhouetteContainer}>
                <div className={style.quizContainer}>
                    <img className={style.pokemonSilhouette} src={pokemonImg}/>
                    <div className={style.quiz}>
                        <div>このポケモンのなまえは？</div>
                    </div>
                </div>
                <Link
                    className={style.answerButton}
                    to= {{
                        pathname: "/pokemon-silhouette-quiz/status",
                        search: `?id=${pokemonId}`
                    }}
                >
                    <img className={style.answerButtonImg} src={'answerButton.png'}/>
                </Link>
            </div>

        )
    }

}