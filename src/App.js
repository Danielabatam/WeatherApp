import React, {useState, useEffect} from 'react';

//import axios
import axios from 'axios';

//import icons
import {
    IoMdSunnyder,
    IoMdRainy,
    IoMdCloudy,
    IoMdSnow,
    IoMdThunderstorm,
    IoMdSearch, IoMdSunny
} from "react-icons/io";

import {
    BsCloudHaze2Fill,
    BsFillCloudDrizzleFill,
    BsEye,
    BsWater,
    BsThermometer,
    BsWind
} from "react-icons/bs";

import {ImSpinner8} from "react-icons/im";
import {TbTemperatureCelsius} from "react-icons/tb";

//api key
const APIkey = 'b3defab481a9968b9e1cc328ab0daab0'

const App = () => {
    const [data, setData] = useState(null);
    const [location, setLocation] = useState('Douala');
    const [inputValue, setInputValue] = useState('');
    const [animate, setAnimate] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const  handleInput = (e) => {
        setInputValue(e.target.value);
    }

    const handleSubmit = (e) => {
        // console.log(inputValue);


        //if input values is not empty
        if(inputValue !== ''  ) {
            // set location
            setLocation(inputValue);
        }

        // select input
        const input = document.querySelector('input');

        // if input value is empty
        if(input.value === '') {
            //set animate to true
            setAnimate(true);

            setTimeout(() => {
                setAnimate(false);
            }, 500);
        }

        //clear input
        input.value = '';


        //prevent defaults
        e.preventDefault();

    }

    // console.log(inputValue);

    //fetch the data
    useEffect(() => {
        // set loading to true
        setLoading(true);

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`

        axios.get(url).then((res) => {
            // setData(res.data);

            // set the data after 1500 ms
            setTimeout(()=> {
                setData(res.data);
                //set loading to false
                setLoading(false);
            }, 1500)
        }).catch(err => {
            setLoading(false);
            setErrorMsg(err);
        });
    }, [location]);

    // error message
    useEffect(() => {
        const timer = setTimeout(() => {
            setErrorMsg('')
        },2000)
        //clear timer
        return ()=> clearTimeout(timer);
    }, [errorMsg])

    // console.log(data);

    if (!data) {
        return (
            <div className={"w-full h-screen bg-gradientBg bg-no-repeat bg-cover bg-center flex flex-col justify-center" +
                "items-center"}>
                <div>
                    <ImSpinner8 className={"text-5xl animate-spin text-white"}/>
                </div>
            </div>
        )
    }

    //set the icon according to weather
    let icon;
    // console.log(data.weather[0].main)

    switch (data.weather[0].main) {
    // switch ("Snow") {
        case 'Clouds':
            icon = <IoMdCloudy />;
            break;
        case 'Haze':
            icon = <BsCloudHaze2Fill />;
            break;
        case 'Rain':
            icon = <IoMdRainy className={"text-[#31cafb]"}/>;
            break;
        case 'Clear':
            icon = <IoMdSunny className={"text-[#ffde33]"}/>;
            break;
        case 'Drizzle':
            icon = <BsFillCloudDrizzleFill className={"text-[#31cafb]"}/>;
            break;
        case 'Snow':
            icon = <IoMdSnow className={"text-[#31cafb]"}/>;
            break;
        case 'Thunderstrom':
            icon = <IoMdThunderstorm />;
            break;
    }

    //date object
    const date = new Date();

    return (
        // <div className={"text-6xl"}>{icon}</div>

        <div className={"w-full h-screen bg-gradientBg bg-no-repeat bg-cover bg-center flex flex-col items-center " +
            "justify-center px-4 lg:px-0"}>
            {errorMsg && <div className={"w-full max-w-[90vw] lg:max-w-[450px] bg-[#ff208x] text-white absolute top-2 " +
                "lg:top-10 p-4 capitalize rounded-md"}>
                {`${errorMsg.response.data.message}`}</div>
            }
            {/*form*/}
            <form className={`${animate ? 'animate-shake' : 'animate-none'} h-16 bg-black/30 w-full max-w-[450px] rounded-full backdrop-blur-[22px] mb-8 `}>
                <div className={"h-full relative flex items-center justify-between p-2"}>
                    <input onChange={(e)=> handleInput(e)}
                            className={"flex-1 bg-transparent outline-none placeholder:text-white text-white tex-[15px] " +
                            "font-light pl-6 h-full"}
                           type={"text"}
                           placeholder={"Search by city or country"}/>
                    <button onClick={(e) => handleSubmit(e)} className={"bg-[#1ab8ed] w-20 h-12 rounded-full flex justify-center items-center transition"}>
                        <IoMdSearch className={"text-2xl text-white"}/>
                    </button>
                </div>
            </form>
            {/*card*/}
            <div className={"w-full bg-black/20 min-h-[584px] text-white backdrop-blur-[32px] rounded-[32px] py-12 px-6"}>
                {loading ? (
                    <div className={"w-full h-full flex justify-center items-center"}>
                        <ImSpinner8 className={"text-white text-5xl animate-spin"} />
                    </div>) : (

                    <div>
                        {/*card top*/}

                        {/*<div className={"bg-pink-100/30 flex items-center gap-x-5 "}>*/}
                        <div className={"flex items-center gap-x-5 "}>
                            {/*icon*/}
                            <div className={"text-[87px]"}>{icon}</div>
                            <div>
                                {/*country name*/}
                                <div className={"text-2xl font-semibold]"}>{data.name}, {data.sys.country}</div>
                                {/*date*/}
                                <div>
                                    {date.getUTCDate()}/{date.getUTCMonth()+1}/{date.getFullYear()}
                                </div>
                            </div></div>
                        {/*card body*/}
                        <div className={"my-20"}>
                            <div className={"flex justify-center items-center"}>
                                <div>
                                    {/*temp*/}
                                    <div className={"text-[144px] leading-none font-light"}>{parseInt(data.main.temp)}</div>
                                </div>
                                {/*celsieus icon*/}
                                <div className={"text-4xl"}>
                                    <TbTemperatureCelsius/>
                                </div>
                            </div>
                            {/*weather description */}
                            <div className={"capitalize text-center"}>
                                {data.weather[0].description}
                            </div>

                        </div>

                        {/*card bottom*/}
                        <div className={"max-w-[378px] mx-auto flex flex-col gap-y-6"}>
                            <div className={"flex justify-between"}>
                                <div className={"flex items-center gap-x-2"}>
                                    {/*icon*/}
                                    <div className={"text-[20px]"}>
                                        <BsEye/>
                                    </div>
                                    <div>
                                        Visibility <span className={"ml-2"}>{data.visibility / 1000} km</span>
                                    </div>
                                </div>
                                <div className={"flex items-center gap-x-2"}>
                                    {/*icon*/}
                                    <div className={"text-[20px]"}>
                                        <BsThermometer/>
                                    </div>
                                    <div className={"flex"}>
                                        Feels like
                                        <div className={"flex ml-2"}>
                                            {parseInt(data.main.feels_like)}
                                            <TbTemperatureCelsius/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={"flex justify-between"}>
                                <div className={"flex items-center gap-x-2"}>
                                    {/*icon*/}
                                    <div className={"text-[20px]"}>
                                        <BsWater/>
                                    </div>
                                    <div>
                                        Humidity <span className={"ml-2"}>{data.main.humidity } %</span>
                                    </div>
                                </div>
                                <div className={"flex items-center gap-x-2"}>
                                    {/*icon*/}
                                    <div className={"text-[20px]"}>
                                        <BsWind/>
                                    </div>
                                    <div className={"flex ml-2"}>
                                        Wind
                                        <span className={"ml-2"}>{parseInt(data.wind.speed)} m/s </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                )}
            </div>
        </div>
    );
    // (
    //     <div className={"text-6xl"}>{icon}</div>
    // );
};

export default App;
