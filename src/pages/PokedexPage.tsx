import style from './PokedexPage.module.scss'
import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';

export const PokedexPage = () => {
    const [buttonImgUrl, setButtonImgUrl] = useState('continueButton.svg');
    const search = useLocation().search
    const pokemonId = (new URLSearchParams(search)).get('id')
    const [pokemon, setPokemon] = useState();
    const [pokemonImg, setPokemonImg] = useState<string>();
    const [species, setSpecies] = useState();
    const [abilities, setAbilities] = useState<string>();
    const [types, setTypes ] = useState<string>();
    const [hpCount, setHpCount ] = useState<number>(0);
    const [attackCount, setAttackCount ] = useState<number>(0);
    const [defenseCount, setDefenseCount ] = useState<number>(0);
    const [spAttackCount, setSpAttackCount ] = useState<number>(0);
    const [spDefenseCount, setSpDefenseCount ] = useState<number>(0);
    const [speedCount, setSpeedCount ] = useState<number>(0);
    const [gender, setGender ] = useState(['']);

    const makeGage = (gageCount:number) => {
        const gage = []
        if(gageCount>15){gageCount = 15}
        for (let i = 0; i < gageCount; i++){
            gage.push('y')
        }
        for (let i = 0; i < 15-gageCount; i++){
            gage.push('w')
        }
        return gage.map((gage,index)=>{
            if(gage==='y'){return <div key={index} className={style.yellowGage}/>}
            return <div key={index} className={style.whiteGage}/>
        })
    }

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
            .then(res=>res.json()
                .then(resJson => setPokemon(resJson)))
    }, []);

    useEffect(() => {
        if(pokemon){
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            fetch(pokemon.sprites.other.home.front_default)
                .then(res => res.blob()
                    .then(resBlob => setPokemonImg(URL.createObjectURL(resBlob))))
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            fetch(pokemon.species.url)
                .then(res => res.json()
                    .then(resJson => setSpecies(resJson)))
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            pokemon.abilities.forEach(async element => {
                const res = await fetch(element.ability.url)
                const ability = await res.json();
                let pokemonAbilities = ""
                pokemonAbilities += ability.names.filter((element: { language: { name: string; }; }) => element.language.name === 'ja')[0].name
                pokemonAbilities += '/'
                setAbilities(pokemonAbilities)
            })
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            pokemon.types.forEach(async element => {
                const res = await fetch(element.type.url)
                const type = await res.json();
                let pokemonTypes = ""
                pokemonTypes += type.names.filter((element: { language: { name: string; }; }) => element.language.name === 'ja')[0].name
                pokemonTypes += '/'
                setTypes(pokemonTypes)
            })
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            setHpCount(Math.floor(pokemon.stats.filter(element => element.stat.name === 'hp')[0].base_stat/10))
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            setAttackCount(Math.floor(pokemon.stats.filter(element => element.stat.name === 'attack')[0].base_stat/10))
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            setDefenseCount(Math.floor(pokemon.stats.filter(element => element.stat.name === 'defense')[0].base_stat/10))
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            setSpAttackCount(Math.floor(pokemon.stats.filter(element => element.stat.name === 'special-attack')[0].base_stat/10))
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            setSpDefenseCount(Math.floor(pokemon.stats.filter(element => element.stat.name === 'special-defense')[0].base_stat/10))
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            setSpeedCount(Math.floor(pokemon.stats.filter(element => element.stat.name === 'speed')[0].base_stat/10))
        }

    }, [pokemon]);

    useEffect(() => {
        if(species){
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            if(species.gender_rate === 8){
                setGender(['f'])
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
            } else if(species.gender_rate === 0){
                setGender(['m'])
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
            } else if(species.gender_rate === -1){
                setGender(['不明'])
            } else {
                setGender(['f','m'])
            }
        }
    }, [species]);

    if(pokemon&&species&&pokemonId){
        return (
            <div className={style.pokedex}>
                <div className={style.pokemonImgContainer}>
                    <img className={style.pokemonImg} src={pokemonImg} />
                    <div className={style.pokemonName}>
                        <div>No.{pokemonId.toString().padStart(4,'0')}</div>
                        <div>{
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-expect-error
                            species.names.filter(element => element.language.name === 'ja')[0].name
                        }</div>
                        <div>
                            {gender.map((element,index) => {
                                if(element === 'f'){return <img key={index} src='icon_female.svg'/>}
                                else if(element === 'm'){return <img key={index} src='icon_male.svg'/>}
                                else {return <p key={index} >不明</p>}
                            })}
                        </div>
                    </div>
                </div>
                <div className={style.statusContainer}>
                    <div className={style.status}>
                        <div className={style.statusL}>
                            <p className={style.genra}>分類：{
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-expect-error
                                species.genera.filter((element) => element.language.name === 'ja')[0].genus
                            }</p>
                            <p className={style.types}>タイプ：{types}</p>
                            <p className={style.height}>身長：{
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-expect-error
                                pokemon.height*10
                            }cm</p>
                            <p className={style.weight}>体重：{
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-expect-error
                                pokemon.weight/10
                            }kg</p>
                            <p className={style.abilities}>特性：{abilities}</p>
                        </div>
                        <div className={style.statusR}>
                            <div className={style.hpColumn} >
                                <div className={style.hp}>HP</div>
                                <div className={style.hpGage}>
                                    {makeGage(hpCount)}
                                </div>
                            </div>
                            <div className={style.attackColumn} >
                                <div className={style.attack}>こうげき</div>
                                <div className={style.attackGage}>
                                    {makeGage(attackCount)}
                                </div>
                            </div>
                            <div className={style.defenseColumn} >
                                <div className={style.defense}>ぼうぎょ</div>
                                <div className={style.defenseGage}>
                                    {makeGage(defenseCount)}
                                </div>
                            </div>
                            <div className={style.spAttackColumn} >
                                <div className={style.spAttack}>とくこう</div>
                                <div className={style.spAttackGage}>
                                    {makeGage(spAttackCount)}
                                </div>
                            </div>
                            <div className={style.spDefenseColumn} >
                                <div className={style.spDefense}>とくぼう</div>
                                <div className={style.spDefenseGage}>
                                    {makeGage(spDefenseCount)}
                                </div>
                            </div>
                            <div className={style.speedColumn} >
                                <div className={style.speed}>すばやさ</div>
                                <div className={style.speedGage}>
                                    {makeGage(speedCount)}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={style.description}>
                        <p>{
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-expect-error
                            species.flavor_text_entries.filter(element => element.language.name === 'ja')[0].flavor_text
                        }</p>
                    </div>
                </div>
                <div className={style.continueButtonContainer}>
                    <a className={style.continueButton} href='/pokemon-silhouette-quiz'>
                        <img
                            className={style.continueButtonImg}
                            src={buttonImgUrl}
                            onMouseLeave={() => {setButtonImgUrl('continueButton.svg')}}
                            onMouseEnter={() => {setButtonImgUrl('continueButtonHover.svg')}}
                        />
                    </a>
                </div>
            </div>
        )
    }

    return <div></div>
}