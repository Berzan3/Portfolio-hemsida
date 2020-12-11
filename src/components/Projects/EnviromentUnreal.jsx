import React from 'react';
import ReactPlayer from "react-player";

function EnviromentUnreal() {
    return (
        <div className="container">
            <div className="Project">
                <title>EnviromentUnreal</title>

                <ReactPlayer
                    className='react-player'
                    url={require('../../vid/animeradScen_AndreasBerzelius.mp4')}
                    fluid="md"
                    controls={true}
                />

                <div>
                    <h1>What is this?</h1>

                <p>This is a 3D-environment i created in Unreal Engine at a 3D-rendering course at University.</p>

                <h1>The Work</h1>

                    <h4 id="centerize">MoodBoard</h4>
                    <img id="bigImage" src={require('../../img/EnviromentUnreal/Moodboard.png')} alt="moodboard-PNG" />


                    <h4 id="centerize">AssetList</h4>
                    <img id="bigImage" src={require("../../img/EnviromentUnreal/Assetlist.png")} alt="Assetlist-PNG" />
                    <br />
                    <br />
                    <div id="centerize">
                        <img id="bigImage" src={require("../../img/EnviromentUnreal/modelering1.png")} alt="modelering1-PNG" />
                        <img id="bigImage" src={require("../../img/EnviromentUnreal/modelering2.png")} alt="modelering2-PNG" />
                        <img id="bigImage" src={require("../../img/EnviromentUnreal/modelering3.png")} alt="modelering3-PNG" />
                        <img id="bigImage" src={require("../../img/EnviromentUnreal/modelering4.png")} alt="modelering4-PNG" />
                        <img id="bigImage" src={require("../../img/EnviromentUnreal/modelering5.png")} alt="modelering5-PNG" />
                    </div>
                    <br />
                    <br />
                <p>The materials and textures were not made by me but imported from my university.
                When the buildng parts were done it was time to make the scene in Unreal engine.</p>
                <br />

                    <img src={require("../../img/EnviromentUnreal/scenbygge1.PNG")} alt="scenbygge1-PNG" />
                    <img src={require("../../img/EnviromentUnreal/scenbygge2.png")} alt="scenbygge2-PNG" />

                    <br />
                    <br />
                <p>I made two different vertex paint materials one for building walls and one for the house foundation.</p>

                <img src={require("../../img/EnviromentUnreal/vertexpaint1.PNG")} alt="vertexpaint1-PNG" />
                    <img src={require("../../img/EnviromentUnreal/MaterialEditorn_M_1.PNG")} alt="MaterialEditorn_M_1-PNG" />
                    <img src={require("../../img/EnviromentUnreal/vertexpaint2.PNG")} alt="vertextpaint2-PNG" />
                    <img src={require("../../img/EnviromentUnreal/MaterialEditorn_M_2.PNG")} alt="MaterialEditorn_M_2-PNG" />
                    <br />
                    <br />

                <p>I made five different particle effects: torchfire, bonfire, fireflies, chimneysmoke and candle-light.</p>
                <img src={require("../../img/EnviromentUnreal/particles3.png")} alt="particles3-PNG" />
                    <img src={require("../../img/EnviromentUnreal/particles1.PNG")} alt="particles1-PNG" />
                    <br />
                    <br />
                <p>The torchfire effect is very similar to bonfire, just slimmer, smaller and dimmer light.</p>
                <img src={require("../../img/EnviromentUnreal/particles2.png")} alt="particles2-PNG" />


                    <img id="bigImage" src={require("../../img/EnviromentUnreal/moons.PNG")} alt="moons-PNG" />
                    <br />
                <p>The moons are two massive spheres with a transparent plane behind them that radiates a glow.
                They also have a script that makes them always face the player,
                so if the player moves far into a direction the moons still look realistic.</p>
                <br />
                    <br />

                <p>After i was pleased about how my scene looked with all the different post-process effects i recorded the video you can see at the top.
                The sounds are not made by me but imported.
                I had some trouble first with the grass flickering and not loading in properly when i filmed but that was fixed by giving
                the camera some starterframes to load in everything before starting to film.</p>

                <img src={require("../../img/EnviromentUnreal/camerawork.PNG")} alt="camerawork-PNG" />

                    <h1>Challenges</h1>
                <p>The biggest challenge for me during this project was modeling and uv-mapping.
                I had to simplify my design off the buildings because it would have taken too much time off the course to do the whole project.</p>

                <h1>Iteration</h1>
                <p>This was a fun project to do and I didn´t stumble onto many problems during my work.
                I learned how to do basic modeling, uv-mapping and how to make a beautiful scene in Unreal engine.</p>

            </div>

            </div>
        </div>
    );
}

export default EnviromentUnreal;